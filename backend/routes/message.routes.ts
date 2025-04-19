import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { isAuth } from "../middleware/auth";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", isAuth, async (req: Request, res: Response) => {
  const { chat_id, content } = req.body;
  try {
    const id = req.token?.id;

    if (!chat_id) {
      res.status(400).json({
        message: "Не указан идентификатор чата",
      });
      return;
    }

    const data = await prisma.message.create({
      data: {
        chat_id: Number(chat_id),
        sender_id: id,
        content: content,
      },
    });
    res.status(201).json(data);
    return;
  } catch (error) {
    console.error("Ошибка создания сообщения:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
