import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { isAuth } from "../middleware/auth";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/chats", isAuth, async (req: Request, res: Response) => {
  try {
    const id = req.token?.id;

    const chatsUnread = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            user_id: id,
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
            sender_id: { not: id },
            isRead: false,
          },
        },
      },
    });

    const data = chatsUnread.map((chat) => {
      let name: string | null = null;
      let image: string | null = null;

      if (chat.type === "private") {
        const another_user = chat.members.find(
          (member) => member.user_id !== id
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

    res.json(data);
    return;
  } catch (error) {
    console.error("Ошибка при получении данных о чатах:", error);
    res.status(500).json({ error: "Не удалось получить данные о чатах" });
    return;
  }
});

router.get("/chats/search", isAuth, async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    if (!query) {
      res.json([]);
      return;
    } else {
      const id = req.token?.id;
      const data = await prisma.chat.findMany({
        where: {
          members: {
            some: {
              user_id: id,
            },
          },
          OR: [
            {
              type: "group",
              name: {
                startsWith: query,
                mode: "insensitive",
              },
            },
            {
              type: "private",
              members: {
                some: {
                  user: {
                    OR: [
                      { firstName: { startsWith: query, mode: "insensitive" } },
                      { lastName: { startsWith: query, mode: "insensitive" } },
                    ],
                  },
                  NOT: {
                    user_id: id,
                  },
                },
              },
            },
          ],
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
          messages: {
            where: {
              sender_id: { not: id },
              isRead: false,
            },
          },
        },
      });

      const formattedData = data.map((chat) => {
        let name: string | null = null;
        let image: string | null = null;

        if (chat.type === "private") {
          const another_user = chat.members.find(
            (member) => member.user_id !== id
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
      res.json(formattedData);
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "Ошибка сервера",
    });
    return;
  }
});

export default router;
