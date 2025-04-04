"use client";

import { deleteAccount } from "@/actions/profile";
import Button from "../ui/Button";

export default function DeleteAccountForm({ account }: { account: number }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6">
      <div className="flex flex-col gap-[8px]">
        <h4 className="font-medium">Удаление аккаунта</h4>
        <p className="text-neutral-500">Безвозвратное удаление</p>
      </div>
      <Button
        onClick={() => deleteAccount(account)}
        type="submit"
        className="mt-4 w-full rounded-md bg-red-500 text-white"
      >
        Удалить аккаунт
      </Button>
    </div>
  );
}
