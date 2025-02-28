export default async function ChatContent({ chatcontent }: { chatcontent: any }) {
    return (
        <div className="flex flex-col px-[20px] py-[20px] h-full overflow-y-auto">
            <div className="flex flex-col gap-[10px]">
                {chatcontent?.messages?.map((message: any) => (
                    <div
                        key={message.id}
                        className={`inline-flex items-center max-w-[50%] break-words w-max gap-[10px] rounded-[12px] px-[10px] py-[8px] ${
                            message.sender_id === chatcontent.currentUserId
                                ? "ml-auto bg-blue-200"
                                : "bg-neutral-200"
                        }`}
                    >
                        <p>{message.content}</p>
                        <small className={message.sender_id === chatcontent.currentUserId ? "text-blue-500" : "text-neutral-500"}>
                            {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
}