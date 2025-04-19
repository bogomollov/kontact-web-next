import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { apiFetch } from "@/lib/apiFetch";
import { IChat, IChatListItem, IMe } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Чат | kontact web",
  description:
    "Современный корпоративный веб-мессенджер. Безопасные чаты, групповые обсуждения, файлообмен и интеграция с корпоративными системами",
};

export async function getMe(session?: string | undefined) {
  const res = await apiFetch(`/me`, {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const data: IMe = await res.json();
  return data;
}

export async function getChats(session?: string | undefined) {
  const res = await apiFetch(`/chats`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const data: IChatListItem[] = await res.json();
  return data;
}

export async function getChatId(id: string, session: string | undefined) {
  const res = await apiFetch(`/chats/${id}`, {
    cache: "reload",
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const chat: IChat = await res.json();
  if (!chat) notFound();
  return chat;
}

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = (await cookies()).get("session")?.value;

  const me: IMe = await getMe(session);
  const chatList: IChatListItem[] = await getChats(session);

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
