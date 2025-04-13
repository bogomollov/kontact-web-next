import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { isAdmin } from "../middleware/auth";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/admin", isAdmin, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    const accounts = await prisma.account.findMany();
    const positions = await prisma.position.findMany();
    const departments = await prisma.department.findMany();

    res.json({ data: { users, accounts, positions, departments } });
    return;
  } catch (error: any) {
    console.error("Ошибка при получении пользователей:", error);
    res.status(500).json({ error: "Не удалось получить пользователей" });
    return;
  }
});

router.get("/users", isAdmin, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
    return;
  } catch (error: any) {
    console.error("Ошибка при получении пользователей:", error);
    res.status(500).json({ error: "Не удалось получить пользователей" });
    return;
  }
});

export default router;
