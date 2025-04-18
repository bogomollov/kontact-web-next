import { apiFetch } from "@/lib/apiFetch";
import { IAccount, IDepartment, IMe, IPosition, IUser } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { getMe } from "../dashboard/layout";

export const metadata: Metadata = {
  title: "Админ-панель | kontact web",
  description:
    "Современный корпоративный веб-мессенджер. Безопасные чаты, групповые обсуждения, файлообмен и интеграция с корпоративными системами",
};

export default async function Admin() {
  const session = (await cookies()).get("session")?.value;

  const me: IMe = await getMe(session);

  if (me.role_id != 2) redirect("/dashboard");

  const accountsData = await apiFetch("/accounts", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const accounts: IAccount[] = (await accountsData.json()) as IAccount[];

  const usersData = await apiFetch("/users", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const users: IUser[] = (await usersData.json()) as IUser[];

  const departmentsData = await apiFetch("/departments", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const departments: IDepartment[] =
    (await departmentsData.json()) as IDepartment[];

  const positionsData = await apiFetch("/positions", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const positions: IPosition[] = (await positionsData.json()) as IPosition[];

  return (
    <div className="flex min-h-screen flex-col items-center gap-[20px] bg-neutral-50 pb-[100px]">
      <div className="inline-flex w-full justify-between p-[10px]">
        <Link
          href="/profile"
          className="rounded-full p-[10px] hover:bg-neutral-200/50"
        >
          <svg
            width="23"
            height="18"
            viewBox="0 0 23 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 8.875H1M1 8.875L8.875 16.75M1 8.875L8.875 1"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <h2>Панель администратора</h2>
        <h5 className="text-gray-600">Все данные веб-сайта</h5>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[20px] rounded-lg border border-neutral-200 bg-white p-6">
          <div className="flex flex-col gap-[8px]">
            <h4 className="font-medium">Аккаунты</h4>
            <p className="text-gray-500">Список аккаунтов</p>
          </div>
          <div className="rounded-[10px] border">
            <div className="flex flex-col">
              <div className="grid grid-cols-6 border-b *:bg-blue-500 *:py-[8px] *:text-white *:uppercase">
                <a className="rounded-tl-[10px] text-center font-medium">id</a>
                <a className="text-center font-medium">user_id</a>
                <a className="text-center font-medium">username</a>
                <a className="text-center font-medium">email</a>
                <a className="text-center font-medium">phone</a>
                <a className="rounded-tr-[10px] text-center font-medium">
                  role_id
                </a>
              </div>
              <div className="grid grid-cols-6 py-[5px]">
                {accounts.map((account: IAccount) => (
                  <React.Fragment key={account.id}>
                    <p className="py-[5px] text-center">{account.id}</p>
                    <p className="py-[5px] text-center">{account.user_id}</p>
                    <p className="py-[5px] text-center">{account.username}</p>
                    <p className="py-[5px] text-center">
                      {account.email || "null"}
                    </p>
                    <p className="py-[5px] text-center">
                      {account.phone || "null"}
                    </p>
                    <p className="py-[5px] text-center">{account.role_id}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] rounded-lg border border-neutral-200 bg-white p-6">
          <div className="flex flex-col gap-[10px]">
            <h4 className="font-medium">Пользователи</h4>
            <p className="text-gray-500">Список пользователей</p>
          </div>
          <div className="rounded-[10px] border">
            <div className="flex flex-col">
              <div className="grid grid-cols-6 *:bg-blue-500 *:py-[8px] *:text-white *:uppercase">
                <a className="rounded-tl-[10px] text-center font-medium">id</a>
                <a className="text-center font-medium">firstName</a>
                <a className="text-center font-medium">lastName</a>
                <a className="text-center font-medium">middleName</a>
                <a className="text-center font-medium">department_id</a>
                <a className="rounded-tr-[10px] text-center font-medium">
                  position_id
                </a>
              </div>
              <div className="grid grid-cols-6 py-[8px]">
                {users.map((user: IUser) => (
                  <React.Fragment key={user.id}>
                    <p className="py-[5px] text-center">{user.id}</p>
                    <p className="py-[5px] text-center">{user.firstName}</p>
                    <p className="py-[5px] text-center">{user.lastName}</p>
                    <p className="py-[5px] text-center">{user.middleName}</p>
                    <p className="py-[5px] text-center">{user.department_id}</p>
                    <p className="py-[5px] text-center">{user.position_id}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] rounded-lg border border-neutral-200 bg-white p-6">
          <div className="flex flex-col gap-[10px]">
            <h4 className="font-medium">Департаменты</h4>
            <p className="text-gray-500">Список департаментов</p>
          </div>
          <div className="rounded-[10px] border">
            <div className="flex flex-col">
              <div className="grid grid-cols-2 *:bg-blue-500 *:py-[8px] *:text-white *:uppercase">
                <a className="rounded-tl-[10px] text-center font-medium">id</a>
                <a className="rounded-tr-[10px] text-center font-medium">
                  name
                </a>
              </div>
              <div className="grid grid-cols-2 py-[8px]">
                {departments.map((department: IDepartment) => (
                  <React.Fragment key={department.id}>
                    <p className="py-[5px] text-center">{department.id}</p>
                    <p className="py-[5px] text-center">{department.name}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] rounded-lg border border-neutral-200 bg-white p-6">
          <div className="flex flex-col gap-[10px]">
            <h4 className="font-medium">Должности</h4>
            <p className="text-gray-500">Список должностей</p>
          </div>
          <div className="rounded-[10px] border">
            <div className="flex flex-col">
              <div className="grid grid-cols-2 *:bg-blue-500 *:py-[8px] *:text-white *:uppercase">
                <a className="rounded-tl-[10px] text-center font-medium">id</a>
                <a className="rounded-tr-[10px] text-center font-medium">
                  name
                </a>
              </div>
              <div className="grid grid-cols-2 py-[8px]">
                {positions.map((position: IPosition) => (
                  <React.Fragment key={position.id}>
                    <p className="py-[5px] text-center">{position.id}</p>
                    <p className="py-[5px] text-center">{position.name}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
