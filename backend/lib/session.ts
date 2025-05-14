// подключение библиотек
import { Request, Response } from "express";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

const key = process.env.ACCESS_SECRET; // получение секретного ключа для генерации токена
const encodedAccessKey = new TextEncoder().encode(key); // конвертирует секретный ключ в формат Uint8Array для подписи токена
const AccessExpiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 3000); // время работоспособности токена

export interface SessionPayload extends JWTPayload {
  id: number; // идентификатор пользователя
}

// функция создания токена
export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // установка алгоритма и типа токена
    .setIssuedAt() // добавляет метку времени
    .setSubject(`${payload.id}`) // устанавливает какому пользователю принадлежит токен
    .setExpirationTime(AccessExpiresAt) // записывает время через которое истекает токен
    .sign(encodedAccessKey); // подписывает токен ключом
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedAccessKey, {
      algorithms: ["HS256"],
      typ: "JWT",
    });
    return payload as SessionPayload;
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
  const session = await encrypt({ id: payload.id });
  res.cookie("session", session, {
    httpOnly: true,
    expires: AccessExpiresAt,
    sameSite: "strict",
    path: "/",
  });
}
