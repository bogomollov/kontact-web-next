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
        router.push("/dashboard");
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
          <div className="flex w-full flex-col items-center gap-[25px]">
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
