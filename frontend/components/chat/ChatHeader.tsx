import Image from "next/image";

export default function ChatHeader({ chat }: { chat: any }) {
  return (
    <div className="flex items-center justify-between gap-[20px] border-b border-b-neutral-200 px-[20px] py-[20px]">
      <div className="flex items-center justify-center gap-[15px]">
        <div className="relative">
          <Image src={chat.image} alt={"chat avatar"} width={55} height={55} />
          <div className="absolute right-1 bottom-1 h-[12px] w-[12px] rounded-full border border-white bg-blue-500"></div>
        </div>
        <div className="flex flex-col">
          <h4>{chat.name}</h4>
          <p className="text-base text-neutral-500">в сети</p>
        </div>
      </div>
    </div>
  );
}
