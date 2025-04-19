import ChatHeader from "@/components/chat/ChatHeader";
import ChatContent from "@/components/chat/ChatContent";
import ChatForm from "@/components/chat/ChatForm";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/apiFetch";
import { IChat } from "@/types";
import { notFound } from "next/navigation";
import { getMe } from "../layout";

async function getChat(id: string, session: string | undefined) {
  const res = await apiFetch(`/chats/${id}`, {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const chat: IChat = (await res.json()) as IChat;
  if (!chat) notFound();
  return chat;
}

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = (await cookies()).get("session")?.value;
  const id = (await params).id;

  const me = await getMe(session);
  const chat = await getChat(id, session);

  if (!me) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between pb-[30px]">
      <ChatHeader chat={chat} />
      <ChatContent data={chat} authUser={me} />
      <ChatForm chat={id} />
    </div>
  );
}
