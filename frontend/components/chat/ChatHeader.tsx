import { IChat } from "@/types";
import ChatAvatar from "../ui/ChatAvatar";

export default function ChatHeader({ chat }: { chat: IChat }) {
  return (
    <div className="flex items-center justify-between gap-[20px] border-b border-b-neutral-200 px-[20px] py-[20px]">
      <div className="flex items-center justify-center gap-[15px]">
        <div className="relative">
          <ChatAvatar chat_id={chat.id} chat_image={chat.image} />
          {!chat.membersCount && (
            <div className="absolute right-0 bottom-0 h-[14px] w-[14px] rounded-full border-2 border-white bg-blue-500"></div>
          )}
        </div>
        <div className="flex flex-col">
          <h4>{chat.name}</h4>
          <p className="text-base text-neutral-500">
            {chat.membersCount ? `${chat.membersCount} участника` : "в сети"}
          </p>
        </div>
      </div>
    </div>
  );
}
