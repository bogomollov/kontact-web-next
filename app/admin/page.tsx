import { prisma } from "@/prisma/client";
import { Account, Department, Position, User } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default async function Admin() {
    const accounts = await prisma.account.findMany();
    const users = await prisma.user.findMany();
    const departments = await prisma.department.findMany();
    const positions = await prisma.position.findMany();

    return (
        <div className="flex flex-col items-center bg-neutral-50 min-h-screen gap-[20px] pb-[100px]">
            <div className="inline-flex justify-between w-full p-[10px]">
                <Link href="/profile" className="hover:bg-neutral-200/50 rounded-full p-[10px]">
                    <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 8.875H1M1 8.875L8.875 16.75M1 8.875L8.875 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
                <h2>Панель администратора</h2>
                <h5 className="text-gray-600">Все данные веб-сайта</h5>
            </div>
            <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col bg-white p-6 rounded-lg gap-[20px] border border-neutral-200">
                    <div className="flex flex-col gap-[8px]">
                        <h4 className="font-medium">Аккаунты</h4>
                        <p className="text-gray-500">Список аккаунтов</p>
                    </div>
                    <div className="border rounded-[10px]">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-6 border-b *:text-white *:bg-blue-500 *:uppercase *:py-[8px]">
                                <a className="font-medium text-center rounded-tl-[10px]">id</a>
                                <a className="font-medium text-center">user_id</a>
                                <a className="font-medium text-center">username</a>
                                <a className="font-medium text-center">email</a>
                                <a className="font-medium text-center">phone</a>
                                <a className="font-medium text-center rounded-tr-[10px]">role</a>
                            </div>
                            <div className="grid grid-cols-6 py-[5px]">
                                {accounts.map((account: Account) => (
                                    <React.Fragment key={account.id}>
                                        <p className="text-center py-[5px]">{account.id}</p>
                                        <p className="text-center py-[5px]">{account.user_id}</p>
                                        <p className="text-center py-[5px]">{account.username}</p>
                                        <p className="text-center py-[5px]">{account.email || 'null'}</p>
                                        <p className="text-center py-[5px]">{account.phone || 'null'}</p>
                                        <p className="text-center py-[5px]">{account.role_id}</p>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white p-6 rounded-lg gap-[20px] border border-neutral-200">
                    <div className="flex flex-col gap-[10px]">
                        <h4 className="font-medium">Пользователи</h4>
                        <p className="text-gray-500">Список пользователей</p>
                    </div>
                    <div className="border rounded-[10px]">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-6 *:text-white *:bg-blue-500 *:uppercase *:py-[8px]">
                                <a className="font-medium text-center rounded-tl-[10px]">id</a>
                                <a className="font-medium text-center">firstName</a>
                                <a className="font-medium text-center">lastName</a>
                                <a className="font-medium text-center">middleName</a>
                                <a className="font-medium text-center">department_id</a>
                                <a className="font-medium text-center rounded-tr-[10px]">position_id</a>
                            </div>
                            <div className="grid grid-cols-6 py-[8px]">
                                {users.map((user: User) => (
                                    <React.Fragment key={user.id}>
                                        <p className="text-center py-[5px]">{user.id}</p>
                                        <p className="text-center py-[5px]">{user.firstName}</p>
                                        <p className="text-center py-[5px]">{user.lastName}</p>
                                        <p className="text-center py-[5px]">{user.middleName}</p>
                                        <p className="text-center py-[5px]">{user.department_id}</p>
                                        <p className="text-center py-[5px]">{user.position_id}</p>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white p-6 rounded-lg gap-[20px] border border-neutral-200">
                    <div className="flex flex-col gap-[10px]">
                        <h4 className="font-medium">Департаменты</h4>
                        <p className="text-gray-500">Список департаментов</p>
                    </div>
                    <div className="border rounded-[10px]">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-2 *:text-white *:bg-blue-500 *:uppercase *:py-[8px]">
                                <a className="font-medium text-center rounded-tl-[10px]">id</a>
                                <a className="font-medium text-center rounded-tr-[10px]">name</a>
                            </div>
                            <div className="grid grid-cols-2 py-[8px]">
                                {departments.map((department: Department) => (
                                    <React.Fragment key={department.id}>
                                        <p className="text-center py-[5px]">{department.id}</p>
                                        <p className="text-center py-[5px] ">{department.name}</p>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white p-6 rounded-lg gap-[20px] border border-neutral-200">
                    <div className="flex flex-col gap-[10px]">
                        <h4 className="font-medium">Должности</h4>
                        <p className="text-gray-500">Список должностей</p>
                    </div>
                    <div className="border rounded-[10px]">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-2 *:text-white *:bg-blue-500 *:uppercase *:py-[8px]">
                                <a className="font-medium text-center rounded-tl-[10px]">id</a>
                                <a className="font-medium text-center rounded-tr-[10px]">name</a>
                            </div>
                            <div className="grid grid-cols-2 py-[8px]">
                                {positions.map((position: Position) => (
                                    <React.Fragment key={position.id}>
                                        <p className="text-center py-[5px]">{position.id}</p>
                                        <p className="text-center py-[5px]">{position.name}</p>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}