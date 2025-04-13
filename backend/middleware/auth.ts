import { NextFunction, Request, Response } from "express";
import { decrypt, SessionPayload } from "../lib/session";

declare global {
  namespace Express {
    interface Request {
      user?: SessionPayload;
    }
  }
}

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const payload = await decrypt(req.cookies.session);
  if (!req.cookies.session || !payload) {
    res.status(403).json({ message: "Доступ запрещен" });
    return;
  }
  req.user = payload as Express.Request["user"];
  return next();
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.session) {
    res.status(403).json({ message: "Доступ запрещен" });
    return;
  }

  const payload = await decrypt(req.cookies.session);
  if (!payload) {
    res.status(403).json({ message: "Доступ запрещен" });
    return;
  }
  req.user = payload as Express.Request["user"];
  return next();
}
