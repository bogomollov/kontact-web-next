import { Suspense } from "react";
import Loading from "./loading";

import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { apiFetch } from "@/lib/apiFetch";
import { IChatListItem, IMe } from "@/types";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const meData = await apiFetch("/me", {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const me: IMe = (await meData.json()) as IMe;

  const chatsData = await apiFetch("/chats", {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  console.log(chatsData);
  const chatList: IChatListItem[] = (await chatsData.json()) as IChatListItem[];

  if (!me) return null;

  return (
    <div className="flex h-screen">
      <div className="flex w-full max-w-[400px] flex-col border-r border-r-neutral-200">
        <Suspense fallback={<Loading />}>
          <LeftSidebar authUser={me} allchats={chatList} />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
