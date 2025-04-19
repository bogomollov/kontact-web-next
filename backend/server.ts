import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import accountRoutes from "./routes/account.routes";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import messageRoutes from "./routes/message.routes";
import { PrismaClient } from "./generated/prisma/client";
import { isAuth } from "./middleware/auth";

const app = express();
const router = express.Router();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/static",
  express.static("static", {
    setHeaders: async (res, req, stat) => {
      res.set("Cache-Control", "private, max-age=3600, no-cache");
    },
  })
);

app.use(function (req, res, next) {
  console.log(req.method, decodeURIComponent(req.url), res.statusCode);
  next();
});
app.use("/api", router);
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);

router.get("/me", isAuth, async (req: Request, res: Response) => {
  try {
    const id = req.token?.id;

    if (!id) {
      res
        .status(401)
        .json({ message: "Ошибка при получении данных пользователя" });
      return;
    }

    const dataUser = await prisma.account.findUnique({
      where: { user_id: id },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role_id: true,
        user: {
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
    });
    const data = {
      ...dataUser,
      image: `/static/users/${dataUser?.id}.png`,
    };
    res.json(data);
    return;
  } catch {
    console.error("Ошибка при получении данных пользователя");
    res.status(500).json({ error: "Ошибка сервера" });
    return;
  }
});

router.get("/accounts", isAuth, async (req: Request, res: Response) => {
  const id = req.token?.id;

  if (!id) {
    res.status(401).json({ message: "Ошибка при получении данных аккаунтов" });
    return;
  }

  const data = await prisma.account.findMany();
  res.json(data);
  return;
});

router.get("/users", isAuth, async (req: Request, res: Response) => {
  const id = req.token?.id;

  if (!id) {
    res
      .status(401)
      .json({ message: "Ошибка при получении данных пользователей" });
    return;
  }

  const data = await prisma.user.findMany();
  res.json(data);
  return;
});

router.get("/departments", isAuth, async (req: Request, res: Response) => {
  const id = req.token?.id;

  if (!id) {
    res
      .status(401)
      .json({ message: "Ошибка при получении данных департаментов" });
    return;
  }

  const data = await prisma.department.findMany();
  res.json(data);
  return;
});

router.get("/positions", isAuth, async (req: Request, res: Response) => {
  const id = req.token?.id;

  if (!id) {
    res.status(401).json({ message: "Ошибка при получении данных должностей" });
    return;
  }

  const data = await prisma.position.findMany();
  res.json(data);
  return;
});

app.listen(3001, () => {
  console.log(`Сервер запущен на http://localhost:3001`);
});
