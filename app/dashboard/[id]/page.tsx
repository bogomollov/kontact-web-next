import { getOrCreateChat } from "@/actions/chat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContent from "@/components/chat/ChatContent";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import ChatForm from "@/components/chat/ChatForm";
import { verifySession } from "@/lib/dal";

export default async function Chat({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { user_id } = await verifySession()

  const findChat = await prisma.chat.findUnique({
    where: { id },
  });

  const chat = await getOrCreateChat(id);

  if (!findChat || !chat || !user_id) notFound();

  return (
    <div className="flex flex-col justify-between w-full h-full pb-[30px]">
      <ChatHeader chat={chat} authUser={Number(user_id)} />
      <ChatContent chatcontent={chat} />
      <ChatForm chat_id={id} />
    </div>
  );
}