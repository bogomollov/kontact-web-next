import ChatHeader from "@/components/chat/ChatHeader";
import ChatContent from "@/components/chat/ChatContent";
import ChatForm from "@/components/chat/ChatForm";
import { cookies } from "next/headers";
import { getChatId, getMe } from "../layout";

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = (await cookies()).get("session")?.value;
  const id = (await params).id;

  const me = await getMe(session);
  const chat = await getChatId(id, session);

  if (!me) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between pb-[30px]">
      <ChatHeader chat={chat} />
      <ChatContent data={chat} authUser={me} />
      <ChatForm chat_id={chat.id} />
    </div>
  );
}
