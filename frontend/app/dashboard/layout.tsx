import { Suspense } from "react";
import Loading from "./loading";
import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { apiFetch } from "@/lib/apiFetch";
import { IChatListItem, IMe } from "@/types";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await cookies()).get("session")?.value;
  const meData = await apiFetch("/me", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const me: IMe = (await meData.json()) as IMe;

  const chatsData = await apiFetch("/chats", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
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
