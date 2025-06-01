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

// Создание экземпляра Express
const app = express();
// Создание роутера
const router = express.Router();
// Инициализация Prisma клиента
const prisma = new PrismaClient();

// Настройка CORS
app.use(
  cors({
    origin: true, // Разрешать запросы с любых источников
    allowedHeaders: "Content-Type, Authorization", // Разрешенные заголовки
    credentials: true, // Разрешать передачу учетных данных
    optionsSuccessStatus: 200, // Статус для OPTIONS запросов
  })
);

// Подключение middleware для работы с куками
app.use(cookieParser());
// Подключение middleware для парсинга JSON в теле запроса
app.use(express.json());
// Подключение middleware для парсинга URL-encoded данных в теле запроса
app.use(express.urlencoded({ extended: true }));

// Настройка статической директории для обслуживания файлов
app.use(
  "/static",
  express.static("static", {
    // Кастомные заголовки для статических файлов
    setHeaders: async (res, req, stat) => {
      res.set("Cache-Control", "private, max-age=3600, no-cache");
    },
  })
);

// Логирующее middleware для вывода информации о запросах
app.use(function (req, res, next) {
  console.log(req.method, decodeURIComponent(req.url), res.statusCode);
  next(); // Передача управления следующему middleware
});

// Подключение роутеров для API
app.use("/api", router); // Базовый маршрут API
app.use("/api/users", userRoutes); // Маршруты для работы с пользователями
app.use("/api/accounts", accountRoutes); // Маршруты для работы с аккаунтами
app.use("/api/admin", adminRoutes); // Маршруты для административных функций
app.use("/api/chats", chatRoutes); // Маршруты для работы с чатами
app.use("/api/messages", messageRoutes); // Маршруты для работы с сообщениями
app.use("/api/auth", authRoutes); // Маршруты для аутентификации

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
