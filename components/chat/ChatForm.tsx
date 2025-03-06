"use client";

import { sendMessage } from "@/actions/chat";
import { useState, useTransition } from "react";

export default function ChatForm({ chat_id }: { chat_id: number }) {
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!message.trim()) return;

        startTransition(async () => {
            try {
                await sendMessage(Number(chat_id), message);
                setMessage("");
            } catch (err) {
                setError((err as Error).message || "Ошибка отправки сообщения");
            }
        });
    };

    return (
        <div className="px-[20px]">
            <div className="flex flex-col items-start gap-[5px] border border-neutral-300 px-[15px] py-[11px] rounded-[10px] w-full">
                <form onSubmit={handleSendMessage} className="flex flex-col gap-[10px] w-full">
                    <textarea
                        rows={1}
                        cols={5}
                        maxLength={200}
                        minLength={1}
                        className="outline-0"
                        placeholder="Сообщение"
                        required
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isPending}
                    />
                    <div className="inline-flex justify-between">
                        <div className="inline-flex gap-[15px]">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.4 11.8C6.4 11.8 7.75 13.6 10 13.6C12.25 13.6 13.6 11.8 13.6 11.8M12.7 7.3H12.709M7.3 7.3H7.309M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM13.15 7.3C13.15 7.54853 12.9485 7.75 12.7 7.75C12.4515 7.75 12.25 7.54853 12.25 7.3C12.25 7.05147 12.4515 6.85 12.7 6.85C12.9485 6.85 13.15 7.05147 13.15 7.3ZM7.75 7.3C7.75 7.54853 7.54853 7.75 7.3 7.75C7.05147 7.75 6.85 7.54853 6.85 7.3C6.85 7.05147 7.05147 6.85 7.3 6.85C7.54853 6.85 7.75 7.05147 7.75 7.3Z"
                                    stroke="#737373"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <input type="image" hidden />
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.2 19H4.93137C4.32555 19 4.02265 19 3.88238 18.8802C3.76068 18.7763 3.69609 18.6203 3.70865 18.4608C3.72312 18.2769 3.93731 18.0627 4.36569 17.6343L12.8686 9.13137C13.2646 8.73536 13.4627 8.53735 13.691 8.46316C13.8918 8.3979 14.1082 8.3979 14.309 8.46316C14.5373 8.53735 14.7354 8.73535 15.1314 9.13137L19 13V14.2M14.2 19C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2M14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V14.2M8.5 6.5C8.5 7.60457 7.60457 8.5 6.5 8.5C5.39543 8.5 4.5 7.60457 4.5 6.5C4.5 5.39543 5.39543 4.5 6.5 4.5C7.60457 4.5 8.5 5.39543 8.5 6.5Z"
                                    stroke="#737373"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <input type="file" hidden />
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17 8.60776L8.97628 16.6315C7.1516 18.4562 4.1932 18.4562 2.36851 16.6315C0.543829 14.8068 0.543829 11.8484 2.36851 10.0237L10.3922 1.99999C11.6087 0.783532 13.581 0.783532 14.7974 1.99999C16.0139 3.21645 16.0139 5.18871 14.7974 6.40517L7.08835 14.1142C6.48012 14.7225 5.49399 14.7225 4.88576 14.1142C4.27753 13.506 4.27753 12.5199 4.88576 11.9116L11.6509 5.14654"
                                    stroke="#737373"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
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
