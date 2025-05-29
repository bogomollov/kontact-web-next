import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { createSession } from "../lib/session";
import { LoginFormSchema, RegisterFormSchema } from "../lib/validation";
import { z } from "zod";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const validatedData = RegisterFormSchema.parse(req.body);
    const { firstName, lastName, middleName, email, username, password } =
      validatedData;

    const [emailExists, usernameExists] = await prisma.$transaction([
      prisma.account.findUnique({ where: { email }, select: { email: true } }),
      prisma.account.findUnique({
        where: { username },
        select: { username: true },
      }),
    ]);

    if (emailExists) {
      res.status(409).json({
        errors: { email: "Аккаунт с такой почтой уже существует" },
      });
      return;
    }

    if (usernameExists) {
      res.status(409).json({
        errors: { username: "Пользователь с таким псевдонимом уже существует" },
      });
      return;
    }

    const salt = genSaltSync(12);
    const passwordHash = hashSync(password, salt);

    const { newUser, account } = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          firstName,
          lastName,
          middleName,
          department_id: 1,
          position_id: 1,
        },
      });

      const createdAccount = await tx.account.create({
        data: {
          user_id: createdUser.id,
          username,
          password: passwordHash,
          email,
          role_id: 1,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 1,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 2,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 3,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 4,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 5,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 6,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 7,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 8,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 9,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 10,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 11,
          user_id: createdUser.id,
        },
      });

      await tx.chatMember.create({
        data: {
          chat_id: 12,
          user_id: createdUser.id,
        },
      });

      return { newUser: createdUser, account: createdAccount };
    });

    await createSession(req, res, {
      id: newUser.id,
      username: account.username,
      email: account.email,
    });

    res.status(201).json({ message: "Успешная регистрация" });
    return;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const fieldsErrors = error.errors.reduce<Record<string, string[]>>(
        (acc, err) => {
          if (err.path?.length) {
            const fieldName = err.path[0];
            acc[fieldName] = [...(acc[fieldName] || []), err.message];
          }
          return acc;
        },
        {}
      );
      res.status(400).json({ errors: fieldsErrors });
      return;
    }
    res.status(500).json({
      message: "Ошибка при регистрации",
    });
    return;
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const validatedData = LoginFormSchema.parse(req.body);
    const { email, password } = validatedData;

    const account = await prisma.account.findUnique({
      where: { email, deletedAt: null },
      include: { role: true, user: true },
    });

    if (!account?.password) {
      res.status(409).json({ message: "Неправильный логин или пароль" });
      return;
    }

    const passwordMatched = await compare(password, account.password);
    if (!passwordMatched) {
      res.status(409).json({ message: "Неправильный логин или пароль" });
      return;
    }

    await createSession(req, res, {
      id: account.user_id,
      username: account.username,
      role: account.role.name,
      email: account.email,
    });

    res.status(201).json({
      message: "Успешная авторизация",
      user: {
        id: account.user_id,
        username: account.username,
        role: account.role.name,
      },
    });
    return;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const fieldsErrors = error.errors.reduce<Record<string, string[]>>(
        (acc, err) => {
          if (err.path?.length) {
            const fieldName = err.path[0];
            acc[fieldName] = [...(acc[fieldName] || []), err.message];
          }
          return acc;
        },
        {}
      );
      res.status(400).json({ errors: fieldsErrors });
      return;
    }

    res.status(500).json({ message: "Ошибка при авторизации" });
    return;
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("session");
  req.token = undefined;
  res.json({ message: "Сессия завершена" });
  return;
});

export default router;
