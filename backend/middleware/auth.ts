import { NextFunction, Request, Response } from "express";
import { decrypt, SessionPayload } from "../lib/session";

declare global {
  namespace Express {
    interface Request {
      token?: SessionPayload;
    }
  }
}

export async function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const session = req.headers["authorization"]?.split(" ")[1];
  const token = session || req.cookies.session;

  if (!token) {
    res.status(401).json({ message: "Требуется авторизация" });
    return;
  }
  try {
    const payload = (await decrypt(token)) as SessionPayload;
    if (!payload) {
      res
        .status(403)
        .json({ message: "Доступ запрещен: недействительный токен" });
      return;
    }
    req.token = payload;
    next();
  } catch (error) {
    console.error("Ошибка при расшифровке токена:", error);
    res.status(403).json({ message: "Доступ запрещен: ошибка токена" });
    return;
  }
}
