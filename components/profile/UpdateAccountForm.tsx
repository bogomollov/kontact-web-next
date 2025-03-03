"use client";

import { useActionState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputLabel from "@/components/ui/InputLabel";
import { updateAccount } from "@/actions/profile";
import { Account } from "@prisma/client";
import InputError from "../ui/InputError";

export default function UpdateAccountForm({ account }: { account: Account }) {
  const [state, action, pending] = useActionState(updateAccount, undefined);

  return (
    <form action={action} className="flex flex-col gap-3 bg-white p-6 rounded-lg">
      <h4 className="font-medium">Данные аккаунта</h4>
      <p className="text-neutral-500">Измените данные своего аккаунта</p>
      <input type="hidden" name="account_id" value={account.id} />
      <div className="mt space-y-3">
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="username">Отображаемое имя</InputLabel>
          <Input id="username" name="username" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Отображаемое имя" defaultValue={account.username} />
          <InputError message={state?.errors?.username} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="email">Эл.почта</InputLabel>
          <Input id="email" name="email" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Электронная почта" defaultValue={account.email || undefined} />
          <InputError message={state?.errors.email} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <InputLabel htmlFor="phone">Номер телефона</InputLabel>
          <Input id="phone" name="phone" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Номер телефона" defaultValue={account.phone || undefined} />
          <InputError message={state?.errors.phone} />
        </div>
        <Button type="submit" disabled={pending} className="text-white bg-blue-500 disabled:bg-blue-500/80 mt-4 rounded-md w-full">
          Сохранить изменения
        </Button>
      </div>
    </form>
  );
}