"use client";

import { useActionState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputLabel from "@/components/ui/InputLabel";
import { updatePassword } from "@/actions/profile";
import InputError from "../ui/InputError";

export default function UpdatePasswordForm({ account }: { account: number }) {
    const [state, action, pending] = useActionState(updatePassword, undefined);

    return (
        <form action={action} className="flex flex-col gap-3 bg-white p-6 rounded-lg border border-neutral-200">
            <h4 className="font-medium">Изменить пароль</h4>
            <p className="text-neutral-500">Используйте длинный пароль</p>
            <input type="hidden" name="account_id" value={account} />
            <div className="mt-2 space-y-3">
                <div className="flex flex-col gap-[8px]">
                    <InputLabel htmlFor="currentPassword">Текущий пароль</InputLabel>
                    <Input id="currentPassword" name="currentPassword" type="password" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Введите существующий пароль" />
                    <InputError message={state?.errors?.currentPassword} />
                </div>
                <div className="flex flex-col gap-[8px]">
                    <InputLabel htmlFor="newPassword">Новый пароль</InputLabel>
                    <Input id="newPassword" name="newPassword" type="password" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Придумайте безопасный пароль" />
                    <InputError message={state?.errors?.newPassword} />
                </div>
                <div className="flex flex-col gap-[8px]">
                    <InputLabel htmlFor="repeatPassword">Подтверждение пароля</InputLabel>
                    <Input id="repeatPassword" name="repeatPassword" type="password" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Повторите новый пароль" />
                    <InputError message={state?.errors?.repeatPassword} />
                </div>
                <InputError message={state?.message} />
            </div>
            <Button type="submit" disabled={pending} className="text-white bg-blue-500 disabled:bg-blue-500/80 mt-4 rounded-md w-full">
                Сохранить изменения
            </Button>
        </form>
    );
}