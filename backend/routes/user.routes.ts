import express, { Request, Response } from "express";
import fs from "fs/promises";
import sharp from "sharp";
import multer from "multer";
import { PrismaClient } from "../generated/prisma/client";
import path from "path";
import { isAuth } from "../middleware/auth";

const prisma = new PrismaClient();
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../static/users")),
  filename: (req, file, cb) =>
    cb(null, `${req.token?.id}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("image");

router.patch(
  "/users/:id",
  isAuth,
  upload,
  async (req: Request, res: Response) => {
    const pathId = req.params.id;
    const id = req?.token?.id;

    if (!pathId) {
      res.status(401).json({ message: "Не указан идентификатор пользователя" });
      return;
    }

    const { firstName, lastName, middleName } = req.body;
    const imageFile = req.file as Express.Multer.File | undefined;

    if (!firstName && !lastName && !middleName && !imageFile) {
      res
        .status(409)
        .json({ message: "Укажите хотя бы одно поле для обновления" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(pathId) },
      });
      if (!user) {
        res.status(404).json({ message: "Пользователь не найден" });
        return;
      }

      const updateData: any = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (middleName) updateData.middleName = middleName;
      if (imageFile) {
        const input = path.join(
          __dirname,
          "../static/users",
          imageFile.filename
        );
        const newFilename = `${req.token?.id}.png`;
        const output = path.join(__dirname, "../static/users", newFilename);

        await sharp(input).png().toFile(output);
        fs.unlink(input);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
      });
      res.status(200).json({ message: "Профиль обновлен", user: updatedUser });
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
);

export default router;
