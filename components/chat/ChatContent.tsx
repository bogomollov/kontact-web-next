export default async function ChatContent({
  chatcontent,
  authUser,
}: {
  chatcontent: any;
  authUser: number;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-[20px] py-[20px]">
      <div className="flex flex-col gap-[10px]">
        {chatcontent?.messages?.map((message: any) => (
          <div
            key={message.id}
            className={`inline-flex w-max max-w-[50%] items-center gap-[10px] rounded-[12px] px-[10px] py-[8px] break-words ${message.sender.id === authUser ? "ml-auto bg-blue-200" : "bg-neutral-200"}`}
          >
            <p>{message.content}</p>
            <small
              className={
                message.sender.id == authUser
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
        ))}
      </div>
    </div>
  );
}
