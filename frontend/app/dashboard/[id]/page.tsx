import ChatHeader from "@/components/chat/ChatHeader";
import ChatContent from "@/components/chat/ChatContent";
import { notFound } from "next/navigation";
import ChatForm from "@/components/chat/ChatForm";

export default async function Chat({ params }: { params: { id: string } }) {
  // const id = Number(params.id);

  return (
    <div className="flex h-full w-full flex-col justify-between pb-[30px]">
      {/* <ChatHeader chat={chat} authUser={Number(user_id)} />
      <ChatContent chatcontent={chat} authUser={Number(user_id)} />
      <ChatForm chat_id={id} /> */}
    </div>
  );
}
