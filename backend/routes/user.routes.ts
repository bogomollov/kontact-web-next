import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { isAuth } from "../middleware/auth";

const prisma = new PrismaClient();
const router = express.Router();

router.patch("/users/:id", isAuth, async (req: Request, res: Response) => {
  const pathId = req.params.id;
  const id = req?.token?.id;

  if (!id) {
    res
      .status(401)
      .json({ message: "Ошибка при обновлении данных пользователя" });
    return;
  }
});

export default router;
