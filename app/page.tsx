"use client";

import Image from "next/image";
import Link from "next/link";
import preview from '@/preview.webp';
import FAQ from "@/components/FAQ";
import API from "@/components/API";

export default function Home() {
  return (
    <>
      <header className="border-b">
        <div className="container mx-auto flex justify-between items-center px-5 py-2.5">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="text-[24px]">контакт</div>
            <div className="text-neutral-500 bg-neutral-200 px-[6px] rounded-[5px]">
              веб
            </div>
          </Link>
          <nav className="flex items-center space-x-6 *:text-neutral-500 *:hover:text-neutral-950">
            <Link href="#features">Функции</Link>
            <Link href="#faq">Вопросы и ответы</Link>
            <Link href="#api">API</Link>
          </nav>
          <Link href="/login"
            className="inline-flex px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
            Начать общение
          </Link>
        </div>
      </header>
      <main>
        <div className="container flex flex-col mx-auto justify-between items-center px-5 py-[50px] rounded-[12px] gap-[30px]">
          <div className="flex flex-col mx-auto items-center gap-[20px] max-md:gap-[5px] md:max-xl:gap-[10px]">
            <h1>Современный корпоративный мессенджер</h1>
            <h4 className="text-neutral-500">Быстрый. Надежный. Простой.</h4>
          </div>
          <Image src={preview} alt="preview-app" priority
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 100vw, 100vw"
            style={{
              borderRadius: '12px',
              border: '1px solid #E5E5E5',
            }} />
        </div>
        <div className="container flex flex-col mx-auto gap-[70px] justify-between px-5 mb-[70px]">
          <API />
          <FAQ />
        </div>
      </main>
    </>
  );
}