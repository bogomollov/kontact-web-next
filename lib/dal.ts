import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";

import { prisma } from "@/prisma/client";
import { createClient } from "redis";

const redis = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.user_id) {
    redirect("/login");
  }

  return { user_id: session.user_id };
});

export const getAccount = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  // const [id, username, email, phone, role_id, user_id] = await redis.hmGet(`account:${session.user_id}`, ['id', 'username', 'email', 'phone', 'role_id', 'user_id']);
  // if (id) {
  //     let res = {
  //         id: Number(id),
  //         username: username,
  //         email: email,
  //         phone: phone,
  //         role_id: Number(role_id),
  //         user_id: Number(user_id),
  //     }
  //     return res
  // }
  else {
    const account = await prisma.account.findFirst({
      where: {
        user_id: session.user_id,
      },
    });

    if (!account) {
      return;
    }

    // await redis.hSet(`account:${account.id}`, ['id', `${account.id}`, 'username', `${account.username}`, 'email', `${account.email}`, 'phone', `${account.phone}`, 'role_id', `${account.role_id}`, 'user_id', `${account.user_id}`])

    return account;
  }
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  // const [id, firstName, lastName, middleName, department_id, position_id] = await redis.hmGet(`user:${session.user_id}`, ['id', 'firstName', 'lastName', 'middleName', 'department_id', 'position_id']);
  // if (id) {
  //     let res = {
  //         id: Number(id),
  //         firstName: firstName,
  //         lastName: lastName,
  //         middleName: middleName,
  //         department_id: Number(department_id),
  //         position_id: Number(position_id),
  //     }
  //     return res
  // }
  else {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.user_id),
      },
    });

    if (!user) {
      return;
    }

    // await redis.hSet(`user:${user.id}`, ['id', `${user.id}`, 'firstName', `${user.firstName}`, 'lastName', `${user.lastName}`, 'middleName', `${user.middleName}`, 'department_id', `${user.department_id}`, 'position_id', `${user.position_id}`])

    return user;
  }
});
