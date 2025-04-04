import { getUserChatList } from "@/actions/chat";
import { getAccount, getUser } from "@/lib/dal";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

import { LeftSidebar } from "@/components/sidebar/LeftSidebar";

export const metadata: Metadata = {
  title: "kontact web",
  description: "Современный корпоративный веб-мессенджер. Безопасные чаты, групповые обсуждения, файлообмен и интеграция с корпоративными системами",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const account = await getAccount();

  if (!user || !account) return null;

  const chatList = await getUserChatList(user.id);

  return (
    <div className="flex h-screen">
      <div className="flex w-full max-w-[400px] flex-col border-r border-r-neutral-200">
        <Suspense fallback={<Loading />}>
          <LeftSidebar
            authAccount={account}
            authUser={user}
            allchats={chatList}
          />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
