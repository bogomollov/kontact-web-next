import { prisma } from "@/prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query")?.trim();

    if (!query) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const data = await prisma.account.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          {
            user: {
              OR: [
                { firstName: { contains: query, mode: "insensitive" } },
                { lastName: { contains: query, mode: "insensitive" } },
              ],
            },
          },
        ],
      },
      include: { user: true },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Ошибка поиска:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
