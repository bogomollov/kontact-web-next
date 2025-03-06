"use client";

import Link from "next/link";
import { login } from "@/actions/auth";
import { useActionState } from "react";
import Button from "@/components/ui/Button";
import InputError from "@/components/ui/InputError";
import { oauthProviders } from "@/lib/providers";
import Input from "@/components/ui/Input";
import InputLabel from "@/components/ui/InputLabel";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-[20px] md:max-w-md w-full">
        <div className="flex flex-col items-center gap-[10px]">
          <h2>Авторизация</h2>
          <h5 className="text-neutral-500">Войдите в аккаунт, чтобы общаться с коллегами</h5>
        </div>
        <form action={action} className="flex flex-col gap-[20px] w-full">
          <div className="flex flex-col gap-[10px] w-full">
            <div className="flex flex-col items-start gap-[8px] w-full">
              <InputLabel htmlFor="email">Электронная почта</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                className="inline-flex focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]"
                placeholder="user@mail.ru"
                required />
              <InputError message={state?.errors?.email} />
            </div>
            <div className="flex w-full">
              <div className="flex flex-col items-start gap-[8px] w-full">
                <div className="flex justify-between w-full">
                  <label htmlFor="password">Пароль</label>
                  <Link href="/reset-password" className="text-blue-500">Забыли пароль?</Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="inline-flex focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]"
                  placeholder="••••••••••"
                  required
                />
                <InputError message={state?.errors?.password} />
                <InputError message={state?.message} />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={pending} className="text-white bg-blue-500 disabled:bg-blue-500/80 rounded-md w-full">
            Войти
          </Button>
        </form>
        <div className="flex flex-col gap-[20px] w-full">
          <div className="flex w-full items-center justify-between gap-4">
            <hr className="w-full h-px bg-neutral-300 border-0"></hr>
            <small className="text-neutral-500">ИЛИ</small>
            <hr className="w-full h-px bg-neutral-300 border-0"></hr>
          </div>
          <div className="flex flex-col items-center gap-[25px] w-full">
            <div className="flex w-full gap-3">
              {oauthProviders.map(({ id, name, icon }) => (
                <Button key={id} provider={id} icon={icon} className="border w-full rounded-md gap-2">
                  Войти через {name}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <p>Еще нету аккаунта?</p>
              <Link href="/register" className="text-blue-500">
                Создать
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}