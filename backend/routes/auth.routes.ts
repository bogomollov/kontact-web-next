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

    const emailFind = await prisma.account.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
      },
    });

    if (emailFind) {
      res.status(409).json({
        errors: {
          email: "Аккаунт с такой почтой уже существует",
        },
      });
      return;
    }

    const userFind = await prisma.account.findUnique({
      where: {
        username: username,
      },
      select: {
        username: true,
      },
    });

    if (userFind) {
      res.status(409).json({
        errors: {
          username: "Пользователь с таким псевдонимом уже существует",
        },
      });
      return;
    }

    const salt = genSaltSync(12);
    const passwordHash = hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        department_id: 1,
        position_id: 1,
      },
    });

    const account = await prisma.account.create({
      data: {
        user_id: newUser.id,
        username: username,
        password: passwordHash,
        email: email,
        role_id: 1,
      },
    });

    await createSession(req, res, {
      id: newUser.id,
    });
    res.status(201).json({ message: "Успешная регистрация" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const fieldsErrors: { [key: string]: string[] } = {};
      error.errors.forEach((err) => {
        if (err.path && err.message) {
          const fieldName = err.path[0] as string;
          if (!fieldsErrors[fieldName]) {
            fieldsErrors[fieldName] = [];
          }
          fieldsErrors[fieldName].push(err.message);
        }
      });
      res.status(400).json({ errors: fieldsErrors });
    } else {
      console.error("Ошибка при регистрации:", error);
      res.status(500).json({ message: "Ошибка при регистрации" });
    }
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const validatedData = LoginFormSchema.parse(req.body);
    const { email, password } = validatedData;

    const account = await prisma.account.findUnique({
      where: {
        email: email,
        deletedAt: null,
      },
      select: {
        email: true,
        password: true,
        user_id: true,
        username: true,
        role: true,
      },
    });

    if (!account || !account.password) {
      res.status(409).json({ message: "Неправильный логин или пароль" });
      return;
    }

    const passwordMatched = await compare(password, account.password);
    if (!passwordMatched) {
      res.status(409).json({ message: "Неправильный логин или пароль" });
      return;
    }

    const userData = {
      id: account.user_id,
      username: account.username,
      role: account.role.name,
    };

    await createSession(req, res, userData);
    res.status(201).json({ message: "Успешная авторизация" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const fieldsErrors: { [key: string]: string[] } = {};
      error.errors.forEach((err) => {
        if (err.path && err.message) {
          const fieldName = err.path[0] as string;
          if (!fieldsErrors[fieldName]) {
            fieldsErrors[fieldName] = [];
          }
          fieldsErrors[fieldName].push(err.message);
        }
      });
      res.status(400).json({ errors: fieldsErrors });
    } else {
      console.error("Ошибка при авторизации:", error);
      res.status(500).json({ message: "Ошибка при авторизации" });
    }
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  res.clearCookie("session");
  req.token = undefined;
  res.json({ message: "Токен удален" });
  return;
});

export default router;
