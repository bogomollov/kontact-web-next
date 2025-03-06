"use client"

import { deleteAccount } from "@/actions/profile";
import Button from "../ui/Button";

export default function DeleteAccountForm({ account }: { account: number }) {
    return (
        <div className="flex flex-col bg-white p-6 gap-3 rounded-lg border border-neutral-200">
            <div className="flex flex-col gap-[8px]">
                <h4 className="font-medium">Удаление аккаунта</h4>
                <p className="text-neutral-500">Безвозвратное удаление</p>
            </div>
            <Button onClick={() => deleteAccount(account)} type="submit" className="w-full mt-4 bg-red-500 text-white rounded-md">Удалить аккаунт</Button>
        </div>
    )
}