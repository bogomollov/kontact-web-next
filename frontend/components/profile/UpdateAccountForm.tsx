"use client";
import { useActionState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputLabel from "@/components/ui/InputLabel";
import InputError from "../ui/InputError";
import { IMe } from "@/types";

export default function UpdateAccountForm({ authUser }: { authUser: IMe }) {
  const [state, action, pending] = useActionState(updateAccount, undefined);

  return (
    <form
      action={action}
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6"
    >
      <h4 className="font-medium">Данные аккаунта</h4>
      <p className="text-neutral-500">Измените данные своего аккаунта</p>
      <input type="hidden" name="account_id" value={authUser.id} />
      <div className="mt space-y-3">
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="username">Отображаемое имя</InputLabel>
          <Input
            id="username"
            name="username"
            className="w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
            placeholder="Отображаемое имя"
            defaultValue={account.username}
          />
          <InputError message={state?.errors?.username} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="email">Эл.почта</InputLabel>
          <Input
            id="email"
            name="email"
            className="w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
            placeholder="Электронная почта"
            defaultValue={account.email || undefined}
          />
          <InputError message={state?.errors.email} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="phone">Номер телефона</InputLabel>
          <Input
            id="phone"
            name="phone"
            className="w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
            placeholder="Номер телефона"
            defaultValue={account.phone || undefined}
          />
          <InputError message={state?.errors.phone} />
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="mt-4 w-full rounded-md bg-blue-500 text-white disabled:bg-blue-500/80"
        >
          Сохранить изменения
        </Button>
      </div>
    </form>
  );
}
