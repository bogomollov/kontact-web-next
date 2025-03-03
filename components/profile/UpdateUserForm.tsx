"use client";
import { updateUser } from "@/actions/profile";
import { Account, User } from "@prisma/client";
import { useActionState, useState } from "react";
import Input from "../ui/Input";
import InputLabel from "../ui/InputLabel";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import InputError from "../ui/InputError";

export default function UpdateUserAccount({ user, account, department, position }: { user: User, account: Account, department?: string, position?: string }) {
  const [state, action, pending] = useActionState(updateUser, undefined);
  const [preview, setAvatarUrl] = useState<string>(`/avatars/${account.id}.png`);

  return (
    <form action={action} className="flex flex-col gap-3 bg-white p-6 rounded-lg">
      <div className="flex flex-col gap-[8px]">
        <h4 className="font-medium">Информация профиля</h4>
        <p className="text-neutral-500">Обновите сведения своего профиля</p>
      </div>
      <div className="flex flex-col gap-2">
        <Avatar
          src={preview}
          size={55}
          className="border cursor-pointer rounded-full w-[55px] h-[55px]"
          accountId={account.id}
          onUploadSuccess={(url) => setAvatarUrl(url)}
        />
      </div>
      <input type="hidden" name="account_id" value={account.id} />
      <div className="flex flex-col gap-[8px]">
        <InputLabel htmlFor="firstName">Имя</InputLabel>
        <Input id="firstName" type="text" name="firstName" defaultValue={user.firstName} className="inline-flex focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" />
        <InputError message={state?.errors.firstName} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel htmlFor="lastName">Фамилия</InputLabel>
        <Input id="lastName" type="text" name="lastName" defaultValue={user.lastName} className="inline-flex focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" />
        <InputError message={state?.errors.lastName} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel htmlFor="middleName">Отчество</InputLabel>
        <Input id="middleName" type="text" name="middleName" defaultValue={user.middleName} className="inline-flex focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" />
        <InputError message={state?.errors.middleName} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel>Сфера деятельности</InputLabel>
        <Input defaultValue={department} className="inline-flex focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" disabled />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel>Должность</InputLabel>
        <Input defaultValue={position} className="inline-flex focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" disabled />
      </div>
      <Button type="submit" disabled={pending} className="text-white bg-blue-500 disabled:bg-blue-500/80 mt-4 rounded-md w-full">
        Сохранить изменения
      </Button>
    </form>
  );
}