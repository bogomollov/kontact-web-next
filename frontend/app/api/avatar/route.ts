import { NextRequest, NextResponse } from "next/server";
import { updateAvatar } from "@/actions/profile";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const account_id = formData.get("account_id");
    const file = formData.get("file");

    if (!account_id || !file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Некорректные данные" },
        { status: 400 },
      );
    }

    await updateAvatar(Number(account_id), file);
    return NextResponse.json({ url: `/avatars/${account_id}.svg` });
  } catch (error) {
    console.error("Ошибка загрузки аватара:", error);
    return NextResponse.json({ error: "Ошибка загрузки" }, { status: 500 });
  }
}
