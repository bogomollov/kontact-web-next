import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { isAuth } from "../middleware/auth";
import { createClient } from "redis";

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

    const redis = await createClient()
      .on("error", (err) => console.log("Ошибка при подключении к Redis", err))
      .connect();

    const data = await Promise.all(
      chatsUnread.map(async (chat) => {
        let name: string | null = null;
        let image: string | null = null;
        let is_online: string | null = null;

        if (chat.type === "private") {
          const anotherUser = chat.members.find(
            (member) => member.user_id !== id
          )?.user;

          name = anotherUser
            ? `${anotherUser.firstName} ${anotherUser.lastName}`
            : "Чат удален";
          image = anotherUser?.id
            ? `/static/users/${anotherUser.id}.png`
            : "/static/null.png";

          is_online = await redis.get(`user:${anotherUser?.id}:online`);
        } else if (chat.type === "group" && chat.name) {
          name = chat.name;
          image = `/static/chats/${chat.id}/${chat.id}.png` || null;
        }

        return {
          id: chat.id,
          type: chat.type,
          name,
          image,
          unreadCount: chat.messages.length,
          ...(chat.type === "private" ? { is_online: !!is_online } : undefined),
        };
      })
    );

    await redis.quit();
    res.json(data);
  } catch (error) {
    console.error("Ошибка при получении данных о чатах:", error);
    res.status(500).json({ error: "Не удалось получить данные о чатах" });
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
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!findChat) {
      res.json({ message: "Чат не найден" });
      return;
    }

    const redis = await createClient()
      .on("error", (err) => console.log("Ошибка при подключении к Redis", err))
      .connect();

    const another_user = findChat.members.find(
      (member) => member.user_id !== id
    )?.user;
    const status = await redis.get(`user:${another_user?.id}:online`);

    const data: any = {
      id: findChat.id,
      type: findChat.type,
      name:
        findChat.type == "group"
          ? findChat.name
          : `${another_user?.firstName} ${another_user?.lastName} ${
              another_user?.middleName || ""
            }`.trim(),
      image:
        findChat.type == "group"
          ? `/static/chats/${findChat.id}/${findChat.id}.png`
          : `/static/users/${another_user?.id}.png` || "/static/null.png",
      membersCount: findChat.type == "group" ? findChat.members.length : null,
      messages: findChat.messages,
    };
    if (findChat.type === "private") {
      data.is_online = !!status;
    }

    res.json(data);
    return;
  } catch (e) {
    res.status(500).json({
      message: "Ошибка сервера",
    });
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
    const id = req.token?.id;
    const query = req.query.query as string;
    if (!query) {
      res.json([]);
      return;
    } else {
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

      const formattedData = data.map(async (chat) => {
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
      const resolvedFormattedData = await Promise.all(formattedData);
      res.json(resolvedFormattedData);
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "Ошибка сервера",
    });
    return;
  }
});

router.patch(
  "/:chat_id/messages/read",
  isAuth,
  async (req: Request, res: Response) => {
    try {
      const chat_id = req.params["chat_id"];
      const id = req.token?.id;

      const updatedMessages = await prisma.message.updateMany({
        where: {
          chat_id: Number(chat_id),
          NOT: { sender_id: id },
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      res.json({ count: updatedMessages.count });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
