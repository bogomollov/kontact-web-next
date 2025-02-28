import "server-only";
import { cache } from "react";

import { prisma } from "@/prisma/client";
import { createClient } from "redis";
import { verifySession } from "@/lib/dal";

// const redis = await createClient()
//   .on("error", (err) => console.log("Redis Client Error", err))
//   .connect();

export const getUserChatList = cache(async (Id: number) => {
  return await prisma.chat.findMany({
    where: {
      members: {
        some: { user_id: Id },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  }).then((chats) =>
    chats.map((chat) => ({
      ...chat,
      members: chat.members.filter((m) => m.user.id !== Id),
    })),
  );
});

export const getOrCreateChat = cache(async (findId: number) => {
  const { user_id } = await verifySession();

  let chat = await prisma.chat.findFirst({
    where: {
      type: "private",
      members: {
        some: {
          user_id: Number(user_id),
        },
      },
    },
    include: {
      members: true,
      messages: {
        orderBy: { createdAt: "asc" },
        include: {
          sender: { select: { id: true, firstName: true, lastName: true } },
        },
      },
    },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        type: "private",
        members: {
          connectOrCreate: [
            {
              where: {
                chat_id_user_id: {
                  chat_id: 1,
                  user_id: Number(user_id),
                },
              },
              create: {
                user_id: Number(user_id),
                role_id: 1,
              },
            },
            {
              where: {
                chat_id_user_id: {
                  chat_id: 1,
                  user_id: findId,
                },
              },
              create: {
                user_id: findId,
                role_id: 1,
              },
            },
          ],
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            sender: { select: { id: true, firstName: true, lastName: true } },
          },
        },
      },
    });
  }

  return chat;
});

// const [id, firstName, lastName, middleName, department_id, position_id] = await redis.hmGet(`user:${findId}`, ['id', 'firstName', 'lastName', 'department_id', 'position_id']);

// if (id) {
//     let res = {
//         id: Number(id),
//         firstName: firstName,
//         lastName: lastName,
//         middleName: middleName,
//         department_id: Number(department_id),
//         position_id: Number(position_id)
//     }
//     return res
// }

// await redis.hSet(`messages:${findId}`, ['id', `${messages.id}`])