'use client'
import { useState } from "react";

const faq = [
    {
        question: "Как создать новый чат?",
        answer: "Нажмите на кнопку 'Новый чат' в верхнем меню и выберите коллегу.",
    },
    {
        question: "Как удалить сообщение?",
        answer: "Нажмите на сообщение и выберите 'Удалить' в контекстном меню.",
    },
    {
        question: "Можно ли отправлять файлы?",
        answer: "Да, вы можете прикрепить файлы, нажав на значок скрепки.",
    },
];

export default function FAQ() {
    const [currentIndex, setIndex] = useState<number | null>(null);

    return (
        <div id="faq" className="flex flex-col items-center gap-[30px] w-full max-w-[585px] mx-auto rounded-lg">
            <div className="flex flex-col gap-[10px]">
                <h2>Часто задаваемые вопросы</h2>
                <h4 className="text-neutral-500">Найдите ответы на интересующие вопросы</h4>
            </div>
            <div className="border w-full rounded-lg">
                {faq.map((item, index) => (
                    <div className="last:border-b-0" key={index}>
                        <button className="w-full text-left px-3.5 py-2.5 border-b-1 text-base font-medium text-neutral-950"
                            onClick={() => setIndex(currentIndex === index ? null : index)}>
                            {item.question}
                        </button>
                        {currentIndex === index && (<p className="px-3.5 py-2.5 text-neutral-500">{item.answer}</p>)}
                    </div>
                ))}
            </div>
        </div>
    );
};