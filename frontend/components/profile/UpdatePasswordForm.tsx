"use client";
import { useActionState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputLabel from "@/components/ui/InputLabel";
import InputError from "../ui/InputError";
import { IMe } from "@/types";

export default function UpdatePasswordForm({ authUser }: { authUser: IMe }) {
  const [state, action, pending] = useActionState(updatePassword, undefined);

  return (
    <form
      action={action}
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6"
    >
      <h4 className="font-medium">Изменить пароль</h4>
      <p className="text-neutral-500">Используйте длинный пароль</p>
      <input type="hidden" name="account_id" value={authUser.id} />
      <div className="mt-2 space-y-3">
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="currentPassword">Текущий пароль</InputLabel>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            className="w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
            placeholder="Введите существующий пароль"
          />
          <InputError message={state?.errors?.currentPassword} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="newPassword">Новый пароль</InputLabel>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            className="w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
            placeholder="Придумайте безопасный пароль"
          />
          <InputError message={state?.errors?.newPassword} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="repeatPassword">Подтверждение пароля</InputLabel>
          <Input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            className="w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
            placeholder="Повторите новый пароль"
          />
          <InputError message={state?.errors?.repeatPassword} />
        </div>
        <InputError message={state?.message} />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-md bg-blue-500 text-white disabled:bg-blue-500/80"
      >
        Сохранить изменения
      </Button>
    </form>
  );
}
