import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { isAuth } from "../middleware/auth";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();
const router = express.Router();

router.patch("/accounts/:id", isAuth, async (req: Request, res: Response) => {
  const pathId = req.params.id;

  if (!pathId) {
    res.status(401).json({ message: "Не указан идентификатор аккаунта" });
    return;
  }

  const {
    username = undefined,
    password = undefined,
    newPassword = undefined,
    repeatPassword = undefined,
    email = undefined,
    phone = undefined,
    role_id = undefined,
    user_id = undefined,
  } = req.body;

  if (
    !username &&
    !password &&
    !newPassword &&
    !repeatPassword &&
    !email &&
    !phone &&
    !role_id &&
    !user_id
  ) {
    res
      .status(409)
      .json({ message: "Укажите хотя бы одно поле для обновления" });
    return;
  }

  const account = await prisma.account.findUnique({
    where: { id: Number(pathId) },
    select: {
      password: true,
    },
  });

  if (!account) {
    res.status(404).json({ message: "Аккаунт не найден" });
    return;
  }

  let passwordMatched = true;
  if (password && account.password) {
    passwordMatched = await compare(password, account.password);
    if (!passwordMatched) {
      res.status(409).json({ message: "Неверный текущий пароль" });
      return;
    }
  }

  if (newPassword && repeatPassword && newPassword !== repeatPassword) {
    res.status(409).json({ message: "Пароли не совпадают" });
    return;
  }

  try {
    const updateData: any = {};
    if (username) updateData.username = username;
    if (password && newPassword && repeatPassword) {
      const salt = genSaltSync(12);
      updateData.password = hashSync(newPassword, salt);
    }
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (role_id) updateData.role_id = role_id;
    if (user_id) updateData.user_id = user_id;

    const updatedAccount = await prisma.account.update({
      where: { id: Number(pathId) },
      data: updateData,
    });
    res
      .status(200)
      .json({ message: "Аккаунт обновлен", account: updatedAccount });
  } catch (error) {
    console.error("Ошибка обновления аккаунта:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.delete("/accounts/:id", isAuth, async (req: Request, res: Response) => {
  const pathId = req.params.id;

  if (!pathId) {
    res.status(401).json({ message: "Не указан идентификатор аккаунта" });
    return;
  }

  const account = await prisma.account.update({
    where: { id: Number(pathId) },
    data: {
      deletedAt: new Date(),
    },
  });

  if (!account) {
    res.status(401).json({ message: "Аккаунт не найден" });
    return;
  } else {
    res.clearCookie("session");
    req.token = undefined;
    res.json({ message: "Аккаунт удален" });
    return;
  }
});

export default router;
