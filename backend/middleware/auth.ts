import { NextFunction, Request, Response } from "express";
import { decrypt, SessionPayload } from "../lib/session";
import { createClient } from "redis";

declare global {
  namespace Express {
    interface Request {
      token?: SessionPayload;
    }
  }
}

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const session = req.headers["authorization"]?.split(" ")[1];
  const token = session || req.cookies.session;

  if (!token) {
    res.status(401).json({ message: "Требуется авторизация" });
    return;
  }

  try {
    const payload = (await decrypt(token)) as SessionPayload;

    if (!payload) {
      res.status(403).json({ message: "Недействительный токен" });
      return;
    }
    req.token = payload;

    const redis = await createClient({
      url: "redis://@127.0.0.1",
    })
      .on("error", (error) =>
        console.error("Ошибка при подключении к Redis:", error)
      )
      .connect();

    await redis.set(`user:${payload.id}:online`, "true", {
      expiration: { type: "EX", value: 3 },
    });

    await redis.quit();

    next();
  } catch (error) {
    res.status(403).json({ message: "Доступ запрещен: ошибка токена" });
    return;
  }
}
