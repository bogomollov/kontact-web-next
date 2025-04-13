import { Request, Response } from "express";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

const key = process.env.ACCESS_SECRET;
const node_env = process.env.NODE_ENV;
const encodedAccessKey = new TextEncoder().encode(key);
const AccessExpiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 3000);

export interface SessionPayload extends JWTPayload {
  id: number;
  username: string;
  role: string;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setSubject(crypto.randomUUID())
    .setExpirationTime(AccessExpiresAt)
    .sign(encodedAccessKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedAccessKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(`Failed to verify session: ${error}`);
    return null;
  }
}

export async function createSession(
  req: Request,
  res: Response,
  payload: SessionPayload
) {
  const session = await encrypt({
    id: payload.id,
    username: payload.username,
    role: payload.role,
  });

  res.cookie("session", session, {
    httpOnly: true,
    secure: node_env == "prod",
    expires: AccessExpiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession(req: Request, res: Response) {
  res.clearCookie("session");
}
