import ChatHeader from "@/components/chat/ChatHeader";
import ChatContent from "@/components/chat/ChatContent";
import ChatForm from "@/components/chat/ChatForm";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/apiFetch";

export default async function Chat({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const session = (await cookies()).get("session")?.value;

  const chatData = await apiFetch(`/chats/${id}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const chat: IChat = (await chatData.json()) as IChat;

  return (
    <div className="flex h-full w-full flex-col justify-between pb-[30px]">
      <ChatHeader chat={chat} />
      <ChatContent data={chat} />
      <ChatForm chat={id} />
    </div>
  );
}
