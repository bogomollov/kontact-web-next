"use client";
import useSWR from "swr";
import { apiFetch } from "@/lib/apiFetch";
import { IChatListItem, IMe } from "@/types";
import { LeftSidebar } from "@/components/sidebar/LeftSidebar";

export async function getMe(url: string) {
  const res = await apiFetch(url, {
    credentials: "include",
  });
  return res.json();
}

async function getChats(url: string) {
  const res = await apiFetch(url, {
    credentials: "include",
  });
  return res.json();
}

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: me } = useSWR<IMe>(`/me`, (url) => getMe(url), {
    revalidateOnReconnect: true,
    refreshInterval: 2000,
  });

  const { data: chatList } = useSWR<IChatListItem[]>(
    `/chats`,
    (url) => getChats(url),
    {
      revalidateOnReconnect: true,
      refreshInterval: 1000,
    },
  );

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
