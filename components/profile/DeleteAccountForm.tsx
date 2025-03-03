"use client"

import { deleteAccount } from "@/actions/profile";
import Button from "../ui/Button";

export default function DeleteAccountForm({ account }: { account: number }) {
    return (
        <div className="bg-white p-6 rounded-lg">
            <h4 className="font-medium">Удаление аккаунта</h4>
            <p className="text-neutral-500">Безвозвратное удаление</p>
            <Button onClick={() => deleteAccount(account)} type="submit" className="w-full mt-4 bg-red-500 text-white rounded-md">Удалить аккаунт</Button>
        </div>
    )
}