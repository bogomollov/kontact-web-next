"use client";
import { IChat, IMe, IMessage } from "@/types";
import ChatAvatar from "../ui/ChatAvatar";

interface ChatContentProps {
  data: IChat;
  authUser: IMe;
}

export default function ChatContent({ data, authUser }: ChatContentProps) {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-[20px] py-[20px]">
      <div className="flex flex-col gap-[10px]">
        {data?.messages?.map((message: IMessage) => (
          <div key={message.id} className="flex items-end gap-[8px]">
            {data?.type === "group" && message.sender_id !== authUser.id && (
              <div className="relative flex flex-col">
                <ChatAvatar
                  chat_id={message.sender.id}
                  chat_image={`/static/users/${message.sender_id}.png`}
                />
              </div>
            )}
            <div
              className={`inline-flex w-max max-w-[50%] items-center gap-[10px] rounded-[12px] px-[10px] py-[8px] break-words ${
                message.sender_id === authUser.id
                  ? "ml-auto bg-blue-200"
                  : "bg-neutral-200"
              }`}
            >
              <div className="flex flex-col">
                {data?.type === "group" &&
                  message.sender_id !== authUser.id &&
                  message.sender && (
                    <p
                      className={`font-medium ${
                        message.sender_id === authUser.id
                          ? "text-blue-500"
                          : "text-neutral-500"
                      }`}
                    >
                      {message.sender.firstName} {message.sender.lastName}{" "}
                      {message.sender.middleName}
                    </p>
                  )}
                <p>{message.content}</p>
              </div>
              <small
                className={
                  message.sender_id == authUser.id
                    ? "text-blue-500"
                    : "text-neutral-500"
                }
              >
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
