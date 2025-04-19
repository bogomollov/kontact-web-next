import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { isAuth } from "../middleware/auth";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", isAuth, async (req: Request, res: Response) => {
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

router.post("/", isAuth, async (req: Request, res: Response) => {
  try {
    const id = req.token?.id;
    const { user_id } = req.body;

    if (!user_id) {
      res.status(400).json({
        message:
          "Не указан идентификатор пользователя для создания личного чата",
      });
      return;
    }
    if (id === user_id) {
      res.status(400).json({
        message: "Нельзя создать чат с самим собой",
      });
      return;
    }

    const findChat = await prisma.chat.findFirst({
      where: {
        type: "private",
        members: {
          every: {
            user_id: { in: [id, user_id] },
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (findChat) {
      res.status(200).json({ chat_id: findChat.id });
      return;
    }

    const newChat = await prisma.chat.create({
      data: {
        type: "private",
        members: {
          createMany: {
            data: [{ user_id: id }, { user_id: user_id }],
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (newChat) {
      res.status(201).json({ chat_id: newChat.id });
      return;
    } else {
      res.status(500).json({ message: "Не удалось создать личный чат" });
      return;
    }
  } catch (error) {
    console.error("Ошибка создания личного чата:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/search", isAuth, async (req: Request, res: Response) => {
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

router.get("/:id", isAuth, async (req: Request, res: Response) => {
  try {
    const ParamID = req.params["id"];
    const id = req.token?.id;

    if (!ParamID) {
      res.status(401).json({ message: "Не указан идентификатор чата" });
      return;
    }

    const findChat = await prisma.chat.findUnique({
      where: {
        id: Number(ParamID),
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                middleName: true,
                department_id: true,
                position_id: true,
              },
            },
          },
        },
      },
    });

    if (!findChat) {
      res.json({ message: "Чат не найден" });
    }

    if (findChat) {
      const another_user = findChat.members.find(
        (member) => member.user_id !== id
      )?.user;

      const data: any = {
        id: findChat.id,
        type: findChat.type,
        name:
          findChat.type == "group"
            ? findChat.name
            : `${another_user?.firstName} ${another_user?.lastName} ${another_user?.middleName}`,
        image:
          findChat.type == "group"
            ? `/static/chats/${findChat.id}/${findChat.id}.png`
            : `/static/users/${another_user?.id}.png` || "/static/null.png",
        membersCount: findChat.type == "group" ? findChat.members.length : null,
        messages: findChat.messages,
      };

      res.json(data);
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
