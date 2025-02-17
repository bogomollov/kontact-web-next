"use client"
import Link from "next/link";
import { login } from "@/actions/auth";
import { useActionState } from "react";

export default function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center gap-[20px] md:max-w-md">
                <div className="flex flex-col items-center gap-[10px]">
                    <h2>Авторизация</h2>
                    <h5 className="text-neutral-500">Войдите в аккаунт, чтобы общаться с коллегами</h5>
                </div>
                <form action={action} className="flex flex-col gap-[20px] w-full">
                    <div className="flex flex-col gap-[10px] w-full">
                        <div className="flex flex-col items-start gap-[8px] w-full">
                            <label htmlFor="email">Электронная почта</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="inline-flex focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]"
                                placeholder="user@mail.ru"
                                required
                            />
                            {state?.errors?.email && <small className="text-rose-500">{state.errors.email}</small>}
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
                                {state?.errors?.password && <small className="text-rose-500">{state.errors.password}</small>}
                                {state?.message && <small className="text-rose-500">{state?.message}</small>}
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled={pending} className="inline-flex justify-center px-4 py-2 rounded-md text-white bg-blue-500 disabled:bg-blue-500/80 w-full">Войти</button>
                </form>
                <div className="flex flex-col gap-[20px] w-full">
                    <div className="flex w-full items-center justify-between gap-2">
                        <hr className="w-full h-px bg-neutral-300 border-0"></hr>
                        <small className="text-neutral-500">ИЛИ</small>
                        <hr className="w-full h-px bg-neutral-300 border-0"></hr>
                    </div>
                    <div className="flex flex-col items-center gap-[25px] w-full">
                        <div className="flex w-full">
                            <button className="inline-flex justify-center items-center px-4 py-2 rounded-md border w-full gap-3">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[20px]">
                                    <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path>
                                </svg>
                                Войти через Google
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <p>Еще нету аккаунта?</p><Link href="/register" className="text-blue-500">Создать</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}