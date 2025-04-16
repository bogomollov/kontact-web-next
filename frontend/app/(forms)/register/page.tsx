"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputError from "@/components/ui/InputError";
import Link from "next/link";
import { apiFetch } from "@/lib/apiFetch";
import { FormState, FormErrors } from "@/types";
import Button from "@/components/ui/Button";

export default function RegisterForm() {
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(undefined);
    setPending(true);
    setMessage(undefined);

    try {
      const response = await apiFetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data: FormState = await response.json();

      if (response.ok) {
        router.refresh();
      } else {
        if (data?.errors) {
          setErrors(data.errors);
        } else if (data?.message) {
          setMessage(data.message);
        }
      }
    } catch {
      setMessage("Ошибка при подключении к серверу");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-[25px] md:max-w-md">
        <div className="flex flex-col items-center gap-[10px]">
          <h2>Регистрация</h2>
          <h5 className="text-neutral-500">
            Создайте аккаунт, чтобы общаться с коллегами
          </h5>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-[20px]"
        >
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="firstName">Имя</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="Введите имя"
                required
              />
              <InputError message={errors?.firstName} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="lastName">Фамилия</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="Введите фамилию"
                required
              />
              <InputError message={errors?.lastName} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="middleName">Отчество</label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                value={formData.middleName}
                onChange={handleChange}
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="Введите отчество"
                required
              />
              <InputError message={errors?.middleName} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="email">Электронная почта</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="user@mail.ru"
                required
              />
              <InputError message={errors?.email} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="username">Псевдоним</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="Придумайте псевдоним"
                required
              />
              <InputError message={errors?.username} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="••••••••••"
                required
              />
              <InputError message={errors?.password} />
            </div>
          </div>
          <InputError message={message} />
          <Button
            type="submit"
            disabled={pending}
            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-blue-500/80"
          >
            Создать аккаунт
          </Button>
        </form>
        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex w-full items-center justify-between gap-4">
            <hr className="h-px w-full border-0 bg-neutral-300"></hr>
            <small className="text-neutral-500">ИЛИ</small>
            <hr className="h-px w-full border-0 bg-neutral-300"></hr>
          </div>
          <div className="flex w-full flex-col items-center gap-[25px]">
            <div className="flex w-full gap-[15px]">
              <button className="inline-flex w-full items-center justify-center gap-3 rounded-md border px-4 py-2">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-[20px]"
                >
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  ></path>
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  ></path>
                </svg>
                <p>Войти через Google</p>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <p>Уже есть аккаунт?</p>
              <Link href="/login" className="text-blue-500">
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
