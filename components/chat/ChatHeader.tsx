import Image from "next/image";

export default function ChatHeader({
  chat,
  authUser,
}: {
  chat: any;
  authUser: number;
}) {
  const companion = chat.members.find(
    (member: any) => member.user_id !== authUser,
  );

  return (
    <div className="flex items-center justify-between gap-[20px] border-b border-b-neutral-200 px-[20px] py-[20px]">
      <div className="flex items-center justify-center gap-[15px]">
        <div className="relative">
          <Image
            src={`/avatars/${companion.user.id}.png`}
            alt={"avatar"}
            width={55}
            height={55}
          />
          <div className="absolute right-1 bottom-1 h-[12px] w-[12px] rounded-full border border-white bg-blue-500"></div>
        </div>
        <div className="flex flex-col">
          <h4>
            {companion.user.firstName} {companion.user.lastName}
          </h4>
          <p className="text-base text-neutral-500">в сети</p>
        </div>
      </div>
      <div className="inline-flex items-start gap-[15px] rounded-[10px] border border-neutral-300 px-[15px] py-[11px]">
        <svg
          width="22"
          height="22"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 19.5L13.0001 13.5M15 8.5C15 12.366 11.866 15.5 8 15.5C4.13401 15.5 1 12.366 1 8.5C1 4.63401 4.13401 1.5 8 1.5C11.866 1.5 15 4.63401 15 8.5Z"
            stroke="#737373"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          className="outline-0"
          placeholder="Поиск по сообщениям"
        />
      </div>
    </div>
  );
}
