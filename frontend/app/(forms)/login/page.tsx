"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import InputError from "@/components/ui/InputError";
import Input from "@/components/ui/Input";
import InputLabel from "@/components/ui/InputLabel";
import { useState } from "react";
import { FormErrors, FormState } from "@/types";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiFetch";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(undefined);
    setPending(true);
    setMessage(undefined);

    try {
      const response = await apiFetch("/auth/login", {
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
      <div className="flex w-full flex-col items-center gap-[20px] md:max-w-md">
        <div className="flex flex-col items-center gap-[10px]">
          <h2>Авторизация</h2>
          <h5 className="text-neutral-500">
            Войдите в аккаунт, чтобы общаться с коллегами
          </h5>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-[20px]"
        >
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex w-full flex-col items-start gap-[8px]">
              <InputLabel htmlFor="email">Электронная почта</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="user@mail.ru"
                required
              />
              <InputError message={errors?.email} />
            </div>
            <div className="flex w-full">
              <div className="flex w-full flex-col items-start gap-[8px]">
                <InputLabel htmlFor="password">Пароль</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                  placeholder="••••••••••"
                  required
                />
                <InputError message={errors?.password} />
              </div>
            </div>
          </div>
          <InputError message={message} />
          <Button
            type="submit"
            disabled={pending}
            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-blue-500/80"
          >
            Войти
          </Button>
        </form>
        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex w-full flex-col items-center gap-[25px]">
            <div className="flex items-center gap-2">
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
