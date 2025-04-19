import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { apiFetch } from "@/lib/apiFetch";
import { IChatListItem, IMe } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Чат | kontact web",
  description:
    "Современный корпоративный веб-мессенджер. Безопасные чаты, групповые обсуждения, файлообмен и интеграция с корпоративными системами",
};

export async function getMe(session: string | undefined) {
  const res = await apiFetch(`/me`, {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const me: IMe = (await res.json()) as IMe;
  return me;
}

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = (await cookies()).get("session")?.value;

  const me: IMe = await getMe(session);

  const chatsData = await apiFetch("/chats", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const chatList: IChatListItem[] = await chatsData.json();

  if (!me || !chatList) return null;

  return (
    <div className="flex h-screen">
      <div className="flex w-full max-w-[400px] flex-col border-r border-r-neutral-200">
        <LeftSidebar authUser={me} allchats={chatList} />
      </div>
      {children}
    </div>
  );
}
