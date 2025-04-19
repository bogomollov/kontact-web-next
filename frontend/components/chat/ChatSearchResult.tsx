"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import imageLoader from "@/lib/imageLoader";
import { IChatSearchListItem } from "@/types";

interface UserSearchResultProps {
  user: IChatSearchListItem;
  onCloseSearch: () => void;
}

export function UserSearchResult({
  user,
  onCloseSearch,
}: UserSearchResultProps) {
  const router = useRouter();

  const handleUserClick = async () => {
    onCloseSearch();

    if (user.chat_id) {
      router.push(`/dashboard/${user.chat_id}`);
    } else {
      try {
        const response = await fetch("/api/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id }),
        });

        if (response.ok) {
          const data = await response.json();
          router.push(`/dashboard/${data.chat_id}`);
        } else {
          const errorData = await response.json();
          console.error("Ошибка при создании чата:", errorData.message);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
      }
    }
  };

  return (
    <div
      onClick={handleUserClick}
      className="flex cursor-pointer items-center gap-[20px] rounded-[10px] px-[20px] py-[10px] hover:bg-neutral-50"
    >
      <Image
        loader={imageLoader}
        src={`${user.image}`}
        width={55}
        height={55}
        alt={`avatar ${user.id}`}
        className="h-[55px] w-[55px] rounded-full"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/static/null.png";
        }}
      />
      <div className="flex flex-1 items-center justify-between">
        <h5>{user.name}</h5>
      </div>
    </div>
  );
}
