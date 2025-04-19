"use client";

import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import API from "@/components/API";
import imageLoader from "@/lib/imageLoader";

export default function Home() {
  return (
    <>
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-5 py-2.5">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="text-[24px]">контакт</div>
            <div className="rounded-[5px] bg-neutral-200 px-[6px] text-neutral-500">
              веб
            </div>
          </Link>
          <nav className="flex items-center space-x-6 *:text-neutral-500 *:hover:text-neutral-950">
            <Link href="#features">Функции</Link>
            <Link href="#faq">Вопросы и ответы</Link>
            <Link href="#api">API</Link>
          </nav>
          <Link
            href="/login"
            className="inline-flex rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Начать общение
          </Link>
        </div>
      </header>
      <main>
        <div className="container mx-auto flex flex-col items-center justify-between gap-[30px] rounded-[12px] px-5 py-[50px]">
          <div className="mx-auto flex flex-col items-center gap-[20px] max-md:gap-[5px] md:max-xl:gap-[10px]">
            <h1>Современный корпоративный мессенджер</h1>
            <h4 className="text-neutral-500">Быстрый. Надежный. Простой.</h4>
          </div>
          <Image
            loader={imageLoader}
            src={"/static/preview.webp"}
            alt="preview-app"
            priority
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 100vw, 100vw"
            style={{
              borderRadius: "12px",
              border: "1px solid #E5E5E5",
            }}
          />
        </div>
        <div className="container mx-auto mb-[70px] flex flex-col justify-between gap-[70px] px-5">
          <API />
          <FAQ />
        </div>
      </main>
    </>
  );
}
