import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";

import { prisma } from "@/prisma/client";

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
  else {
    const account = await prisma.account.findFirst({
      where: {
        user_id: session.user_id,
      },
    });

    if (!account) {
      return;
    }

    return account;
  }
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  else {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.user_id),
      },
    });

    if (!user) {
      return;
    }

    return user;
  }
});

export const getDepartments = cache(async () => {
  const departments = await prisma.department.findMany();
  return departments;
});

export const getPositions = cache(async () => {
  const positions = await prisma.position.findMany();
  return positions;
});
