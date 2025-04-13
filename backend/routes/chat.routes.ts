import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { isAuth } from "../middleware/auth";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/chats", isAuth, async (req: Request, res: Response) => {
  try {
    const userID = req.user?.id;

    const chatsUnread = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            user_id: userID,
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        messages: {
          where: {
            sender_id: { not: userID },
            isRead: false,
          },
        },
      },
    });

    const chatData = chatsUnread.map((chat) => {
      let name: string | null = null;
      let image: string | null = null;

      if (chat.type === "private") {
        const another_user = chat.members.find(
          (member) => member.user_id !== userID
        )?.user;
        name = another_user
          ? `${another_user.firstName} ${another_user.lastName}`
          : "Удаленный чат";
        image = `/static/users/${another_user?.id}.png` || "/static/null.png";
      } else if (chat.type === "group" && chat.name) {
        name = chat.name;
        image = `/static/chats/${chat.id}/${chat.id}.png` || null;
      } else {
        name = "Групповой чат";
      }

      return {
        id: chat.id,
        type: chat.type,
        name: name,
        image: image,
        unreadCount: chat.messages.length,
      };
    });

    res.json({ data: chatData });
    return;
  } catch (error) {
    console.error("Ошибка при получении данных о чатах:", error);
    res.status(500).json({ error: "Не удалось получить данные о чатах" });
    return;
  }
});

export default router;
