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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center gap-[20px] md:max-w-md">
        <div className="flex flex-col items-center gap-[10px]">
          <h2>Авторизация</h2>
          <h5 className="text-neutral-500">
            Войдите в аккаунт, чтобы общаться с коллегами
          </h5>
        </div>
        <form action={action} className="flex w-full flex-col gap-[20px]">
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex w-full flex-col items-start gap-[8px]">
              <InputLabel htmlFor="email">Электронная почта</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="user@mail.ru"
                required
              />
              <InputError message={state?.errors?.email} />
            </div>
            <div className="flex w-full">
              <div className="flex w-full flex-col items-start gap-[8px]">
                <div className="flex w-full justify-between">
                  <label htmlFor="password">Пароль</label>
                  <Link href="/reset-password" className="text-blue-500">
                    Забыли пароль?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                  placeholder="••••••••••"
                  required
                />
                <InputError message={state?.errors?.password} />
                <InputError message={state?.message} />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-blue-500 text-white disabled:bg-blue-500/80"
          >
            Войти
          </Button>
        </form>
        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex w-full items-center justify-between gap-4">
            <hr className="h-px w-full border-0 bg-neutral-300"></hr>
            <small className="text-neutral-500">ИЛИ</small>
            <hr className="h-px w-full border-0 bg-neutral-300"></hr>
          </div>
          <div className="flex w-full flex-col items-center gap-[25px]">
            <div className="flex w-full gap-3">
              {oauthProviders.map(({ id, name, icon }) => (
                <Button
                  key={id}
                  provider={id}
                  icon={icon}
                  className="w-full gap-2 rounded-md border"
                >
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
