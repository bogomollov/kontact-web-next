import { sendMessage } from "@/actions/chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { chat_id, message } = await req.json();

    if (!message || !chat_id) {
      return NextResponse.json({ error: "Недостаточно данных" }, { status: 400 });
    }

    await sendMessage(chat_id, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}