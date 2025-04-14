"use client";
import { apiFetch } from "@/lib/apiFetch";
import { InputHTMLAttributes, useEffect, useState } from "react";
import Input from "./Input";
import { IChatListItem } from "@/types";

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  callbackData: (data: IChatListItem[] | null) => void;
}

export default function InputSearch({
  id,
  name,
  className,
  placeholder,
  callbackData,
  ...props
}: InputSearchProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) {
      callbackData(null);
      return;
    }

    const searchData = async () => {
      try {
        const response = await apiFetch(`/chats/search?query=${query}`, {
          credentials: "include",
        });
        const data = (await response.json()) as IChatListItem[];
        callbackData(data);
      } catch (e) {
        console.log("Ошибка поиска", e);
        callbackData([]);
      }
    };

    const delay = setTimeout(searchData, 500);
    return () => clearTimeout(delay);
  }, [query, callbackData]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <svg
        className="absolute left-5 text-gray-500"
        width="20"
        height="20"
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
      <Input
        id={id}
        name={name}
        type="search"
        className="outline-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Введите запрос..."}
        required
        {...props}
      />
    </div>
  );
}
