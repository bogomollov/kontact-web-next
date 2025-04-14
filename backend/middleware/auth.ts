import { NextFunction, Request, Response } from "express";
import { decrypt } from "../lib/session";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const session = req.headers["authorization"]?.split(" ")[1];
  const payload = await decrypt(session || req.cookies.session);
  if (!payload) {
    res.status(403).json({ message: "Доступ запрещен" });
    return;
  }
  return next();
}
