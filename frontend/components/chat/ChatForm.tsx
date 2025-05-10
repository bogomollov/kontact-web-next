"use client";
import { apiFetch } from "@/lib/apiFetch";
import { useState } from "react";

export default function ChatForm({ chat_id }: { chat_id: number }) {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [pending, isPending] = useState<boolean>(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    isPending(true);

    const res = await apiFetch(`/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ chat_id: chat_id, content: message }),
    });
    isPending(false);
    setMessage("");
  };

  return (
    <div className="px-[20px]">
      <div className="flex w-full flex-col items-start gap-[5px] rounded-[10px] border border-neutral-300 px-[15px] py-[11px]">
        <form
          onSubmit={handleSendMessage}
          className="flex w-full flex-col gap-[10px]"
        >
          <textarea
            rows={2}
            minLength={1}
            maxLength={3500}
            className="resize-none outline-0"
            placeholder="Сообщение"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={pending}
            contentEditable
          />
          <div className="inline-flex justify-end">
            <button type="submit">
              <svg
                width="21"
                height="19"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.21844 9.43253H3.71844M3.63379 9.72403L1.29887 16.6987C1.11543 17.2467 1.02372 17.5206 1.08954 17.6894C1.1467 17.8359 1.26946 17.947 1.42094 17.9892C1.59538 18.0379 1.85884 17.9193 2.38578 17.6822L19.0972 10.1621C19.6116 9.93062 19.8687 9.8149 19.9482 9.65414C20.0173 9.51447 20.0173 9.35059 19.9482 9.21093C19.8687 9.05016 19.6116 8.93444 19.0972 8.703L2.37995 1.18025C1.85461 0.94385 1.59194 0.825648 1.41767 0.874136C1.26633 0.916246 1.14358 1.02703 1.08623 1.17327C1.02018 1.34167 1.11092 1.61505 1.29239 2.1618L3.63444 9.21806C3.66561 9.31197 3.68119 9.35892 3.68734 9.40694C3.6928 9.44955 3.69275 9.49269 3.68718 9.53529C3.6809 9.58329 3.6652 9.63021 3.63379 9.72403Z"
                  stroke="#737373"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
