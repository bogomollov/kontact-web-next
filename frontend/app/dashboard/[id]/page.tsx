"use client";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContent from "@/components/chat/ChatContent";
import ChatForm from "@/components/chat/ChatForm";
import { apiFetch } from "@/lib/apiFetch";
import { notFound } from "next/navigation";
import { IChat, IMe } from "@/types";
import { getMe } from "../layout";
import useSWR from "swr";
import React, { useEffect } from "react";

async function getChatId(url: string) {
  const res = await apiFetch(url, {
    credentials: "include",
  });
  return res.json();
}

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  useEffect(() => {
    async function markAsRead() {
      await apiFetch(`/chats/${id}/messages/read`, {
        method: "PATCH",
        cache: "no-store",
        credentials: "include",
      });
    }
    markAsRead();
  }, [id]);

  const {
    data: chat,
    isLoading: isChatLoading,
    error: chatError,
  } = useSWR<IChat>(`/chats/${id}`, getChatId, {
    revalidateOnFocus: true,
    refreshInterval: 3000,
  });

  const {
    data: me,
    isLoading: isMeLoading,
    error: meError,
  } = useSWR<IMe>("/me", getMe, { revalidateOnFocus: false });

  if (isChatLoading || isMeLoading) return <div>Загрузка...</div>;
  if (chatError || meError) return <div>Ошибка загрузки данных</div>;
  if (!chat) notFound();
  if (!me) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between pb-[30px]">
      <ChatHeader chat={chat} />
      <ChatContent data={chat} authUser={me} />
      <ChatForm chat_id={chat.id} />
    </div>
  );
}
