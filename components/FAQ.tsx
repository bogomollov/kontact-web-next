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
        <div id="faq" className="flex flex-col mx-auto p-4 border rounded-lg">
            <h2 className="mb-4">Часто задаваемые вопросы</h2>
            {faq.map((item, index) => (
                <div key={index} className="mb-2">
                    <button className="w-full text-left p-2 bg-neutral-200 rounded-md"
                        onClick={() => setIndex(currentIndex === index ? null : index)}>
                        {item.question}
                    </button>
                    {currentIndex === index && (<p className="p-2 bg-neutral-100 rounded-md mt-1">{item.answer}</p>)}
                </div>
            ))}
        </div>
    );
};