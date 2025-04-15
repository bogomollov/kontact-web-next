import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import chatRoutes from "./routes/chat.routes";
import { PrismaClient } from "./generated/prisma/client";
import { isAuth } from "./middleware/auth";

const app = express();
const router = express.Router();
const prisma = new PrismaClient();

router.use(function (req, res, next) {
  console.log(
    "%s /api%s %s",
    req.method,
    decodeURIComponent(req.url),
    res.statusCode
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(
  "/static",
  express.static("static", {
    setHeaders: async (res, req, stat) => {
      res.set("Cache-Control", "public, max-age=3600");
    },
  })
);

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", chatRoutes);
app.use("/api", router);
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
