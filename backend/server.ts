import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import chatRoutes from "./routes/chat.routes";
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
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/static", isAuth, express.static("static"));
app.use("/api", router);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chats", chatRoutes);

router.use(function (req, res, next) {
  console.log(
    "%s /api%s %s",
    req.method,
    decodeURIComponent(req.url),
    res.statusCode
  );
  return next();
});

router.get("/me", isAuth, async (req: Request, res: Response) => {
  try {
    const data = await prisma.account.findUnique({
      where: { user_id: req.user?.id },
      select: {
        id: true,
        username: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.json({ data });
    return;
  } catch (e) {
    res.status(500).json({ error: "Ошибка сервера" });
    return;
  }
});

router.get("/users/search", async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    if (!query) {
      res.status(200).json({
        data: [],
      });
      return;
    } else {
      const data = await prisma.account.findMany({
        where: {
          OR: [
            {
              username: {
                startsWith: query,
                mode: "insensitive",
              },
            },
            {
              user: {
                OR: [
                  {
                    firstName: {
                      startsWith: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    lastName: {
                      startsWith: query,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          ],
        },
        select: {
          id: true,
          username: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      res.json({
        data,
      });
      return;
    }
  } catch (e) {
    res.status(500).json({
      error: "Ошибка сервера",
    });
    return;
  }
});

app.listen(3001, () => {
  console.log(`Сервер запущен на http://localhost:3001`);
});
