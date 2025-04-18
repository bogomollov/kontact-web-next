"use client";
import React, { useCallback, useState } from "react";
import InputSearch from "../ui/InputSearch";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IChatListItem, IMe, TChatListItem } from "@/types";
import { apiFetch } from "@/lib/apiFetch";
import imageLoader from "@/lib/imageLoader";

export function LeftSidebar({
  authUser,
  allchats,
}: {
  authUser: IMe;
  allchats: TChatListItem[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [image, setImage] = useState<string | undefined>(authUser.image);
  const [chats, setChats] = useState<IChatListItem[]>(allchats);
  const [searchResults, setSearchResults] = useState<IChatListItem[] | null>(
    null,
  );
  const [isSearching, setSearching] = useState(false);

  const handleLogout = async () => {
    const res = await apiFetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      router.refresh();
    }
  };

  const handleSearchResults = useCallback((data: IChatListItem[] | null) => {
    setSearchResults(data);
    setSearching(!!data);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-[15px]">
        <div className="flex flex-col gap-[25px] border-b border-b-neutral-200">
          <div className="flex items-center justify-between gap-[20px] px-[20px] pt-[20px]">
            <div className="flex items-center justify-center gap-[15px]">
              <div className="relative">
                <Image
                  loader={imageLoader}
                  src={`${image}`}
                  width={55}
                  height={55}
                  alt={`avatar ${authUser.id}`}
                  className="h-[55px] w-[55px] cursor-pointer rounded-full border"
                  onError={() => setImage("/static/null.png")}
                />
                <div className="absolute right-1 bottom-1 h-[12px] w-[12px] rounded-full border border-white bg-blue-500"></div>
              </div>
              <div className="flex flex-col">
                <h5>
                  {authUser.user.firstName} {authUser.user.lastName}
                </h5>
                <p className="cursor-pointer text-base text-blue-500">
                  @{authUser.username}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <Link
                href="/profile"
                className="flex items-center justify-center rounded-full p-[10px] hover:bg-neutral-100"
              >
                <svg
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.15379 21.6411L9.85361 23.182C10.0616 23.6407 10.4012 24.0305 10.831 24.304C11.2608 24.5775 11.7624 24.723 12.2751 24.7229C12.7877 24.723 13.2893 24.5775 13.7191 24.304C14.1489 24.0305 14.4885 23.6407 14.6965 23.182L15.3963 21.6411C15.6454 21.0943 16.0645 20.6385 16.5937 20.3386C17.1263 20.0378 17.7425 19.9097 18.3539 19.9726L20.0662 20.151C20.5759 20.2038 21.0903 20.1107 21.5471 19.8829C22.0038 19.6552 22.3832 19.3026 22.6394 18.868C22.8958 18.4336 23.018 17.9357 22.9911 17.4347C22.9641 16.9336 22.7893 16.451 22.4877 16.0454L21.4739 14.6816C21.1129 14.1924 20.92 13.6035 20.9231 13C20.9229 12.3981 21.1176 11.8117 21.4792 11.3249L22.493 9.96114C22.7946 9.5555 22.9695 9.07289 22.9964 8.57185C23.0233 8.07082 22.9011 7.5729 22.6447 7.13852C22.3885 6.70387 22.0091 6.35131 21.5524 6.12357C21.0957 5.89584 20.5813 5.80272 20.0716 5.8555L18.3593 6.03395C17.7478 6.09683 17.1316 5.96871 16.5991 5.66794C16.0687 5.3663 15.6496 4.90806 15.4016 4.35887L14.6965 2.81796C14.4885 2.35927 14.1489 1.96953 13.7191 1.69602C13.2893 1.4225 12.7877 1.27696 12.2751 1.27704C11.7624 1.27696 11.2608 1.4225 10.831 1.69602C10.4012 1.96953 10.0616 2.35927 9.85361 2.81796L9.15379 4.35887C8.90583 4.90806 8.48667 5.3663 7.95637 5.66794C7.42378 5.96871 6.80765 6.09683 6.19617 6.03395L4.47854 5.8555C3.96884 5.80272 3.45444 5.89584 2.99771 6.12357C2.54099 6.35131 2.16156 6.70387 1.90543 7.13852C1.64896 7.5729 1.52678 8.07082 1.55371 8.57185C1.58063 9.07289 1.7555 9.5555 2.0571 9.96114L3.07091 11.3249C3.43246 11.8117 3.62716 12.3981 3.62704 13C3.62716 13.6019 3.43246 14.1883 3.07091 14.6751L2.0571 16.0388C1.7555 16.4445 1.58063 16.9271 1.55371 17.4281C1.52678 17.9292 1.64896 18.4271 1.90543 18.8615C2.16181 19.2959 2.54129 19.6483 2.99795 19.876C3.4546 20.1037 3.96887 20.1969 4.47854 20.1445L6.19085 19.966C6.80233 19.9032 7.41846 20.0313 7.95105 20.3321C8.48333 20.6328 8.90444 21.0912 9.15379 21.6411Z"
                    stroke="#737373"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.2729 16.5169C14.2569 16.5169 15.8652 14.9423 15.8652 13C15.8652 11.0577 14.2569 9.48311 12.2729 9.48311C10.289 9.48311 8.68066 11.0577 8.68066 13C8.68066 14.9423 10.289 16.5169 12.2729 16.5169Z"
                    stroke="#737373"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <form
                action={handleLogout}
                className="flex items-center justify-center rounded-full p-[10px] hover:bg-neutral-100"
              >
                <button type="submit">
                  <svg
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1667 17.8333L22 12M22 12L16.1667 6.16667M22 12H8M11.5 17.8333C11.5 18.9183 11.5 19.4608 11.3807 19.9059C11.0571 21.1137 10.1137 22.0571 8.90587 22.3807C8.46078 22.5 7.9183 22.5 6.83333 22.5H6.25C4.6192 22.5 3.80381 22.5 3.16061 22.2336C2.30301 21.8783 1.62165 21.197 1.26642 20.3394C1 19.6962 1 18.8808 1 17.25V6.75C1 5.1192 1 4.30381 1.26642 3.66061C1.62165 2.80301 2.30301 2.12165 3.16061 1.76642C3.80381 1.5 4.61921 1.5 6.25 1.5H6.83333C7.9183 1.5 8.46078 1.5 8.90587 1.61926C10.1137 1.94289 11.0571 2.88631 11.3807 4.09413C11.5 4.53922 11.5 5.0817 11.5 6.16667"
                      stroke="#737373"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="px-[20px]">
            <InputSearch
              callbackData={handleSearchResults}
              className="inline-flex w-full rounded-[10px] border py-[12px] pr-[20px] pl-[55px] focus:outline-blue-500"
              placeholder="Поиск пользователей"
            />
          </div>
          <div className="flex flex-col px-[20px] pb-[5px]"></div>
        </div>
        <div className="flex flex-col gap-[8px] px-[20px]">
          {isSearching ? (
            <>
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/dashboard/${chat.id}`}
                    className={`flex items-center gap-[20px] rounded-[10px] px-[20px] py-[10px]`}
                  >
                    <Image
                      loader={imageLoader}
                      src={`${chat.image}`}
                      width={55}
                      height={55}
                      alt={`avatar ${chat.id}`}
                      className="h-[55px] w-[55px] rounded-full"
                    />
                    <div className="flex flex-1 items-center justify-between">
                      <h5>{chat.name}</h5>
                      <small className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-blue-500 text-white">
                        {chat.unreadCount}
                      </small>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-neutral-500">
                  Ничего не найдено
                </p>
              )}
            </>
          ) : (
            <>
              {chats && chats.length > 0 ? (
                chats.map((chat) => (
                  <Link
                    href={`/dashboard/${chat.id}`}
                    key={chat.id}
                    className={`flex items-center gap-[20px] rounded-[10px] px-[20px] py-[10px] ${pathname == `/dashboard/${chat.id}` ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
                  >
                    <Image
                      loader={imageLoader}
                      src={`${chat.image}`}
                      width={55}
                      height={55}
                      alt={`chat avatars ${chat.id}`}
                      className="h-[55px] w-[55px] rounded-full"
                    />
                    <div className="flex flex-1 items-center justify-between">
                      <h5>{chat.name}</h5>
                      <small className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-blue-500 text-white">
                        {chat.unreadCount}
                      </small>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-neutral-500">У вас пока нет чатов</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
