"use client";
import imageLoader from "@/lib/imageLoader";
import Image from "next/image";
import { useState } from "react";

export default function ChatAvatar({
  chat_id,
  chat_image,
}: {
  chat_id: number;
  chat_image?: string;
}) {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
    }
  };

  return (
    <Image
      loader={imageLoader}
      src={isError ? "/static/null.png" : `${chat_image}`}
      width={55}
      height={55}
      alt={`chat avatars ${chat_id}`}
      className="h-[55px] w-[55px] rounded-full"
      onError={handleError}
    />
  );
}
