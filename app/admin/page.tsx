import { prisma } from "@/prisma/client";
import { Account, Department, Position, User } from "@prisma/client";

export default async function Admin() {
    const accounts = await prisma.account.findMany();
    const users = await prisma.user.findMany();
    const departments = await prisma.department.findMany();
    const positions = await prisma.position.findMany();

    <div className="flex flex-col gap-[20px] p-[30px] bg-white border border-neutral-200 rounded-lg">
        <div className="flex flex-col">
            <div className="flex flex-col gap-[10px]">
                <h4 className="font-medium">Аккаунты</h4>
                <p className="text-gray-500">Список аккаунтов</p>
            </div>
            <div className="border border-neutral-500 rounded-[10px]">
                <div className="flex flex-col">
                    <div className="grid grid-cols-6 px-[10px] py-[5px] border-b border-neutral-500">
                        <a className="font-medium text-center">id</a>
                        <a className="font-medium text-center">user_id</a>
                        <a className="font-medium text-center">username</a>
                        <a className="font-medium text-center">email</a>
                        <a className="font-medium text-center">phone</a>
                        <a className="font-medium text-center">role</a>
                    </div>
                    <div className="grid grid-cols-6 px-[10px] py-[8px]">
                        {accounts.map((account: Account) => (
                            <>
                                <p className="text-center">{account.id}</p>
                                <p className="text-center">{account.user_id}</p>
                                <p className="text-center">{account.username}</p>
                                <p className="text-center">{account.email}</p>
                                <p className="text-center">{account.phone}</p>
                                <p className="text-center">{account.role_id}</p>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-col gap-[10px]">
                <h4 className="font-medium">Пользователи</h4>
                <p className="text-gray-500">Список пользователей</p>
            </div>
            <div className="border border-neutral-500 rounded-[10px]">
                <div className="flex flex-col">
                    <div className="grid grid-cols-6 px-[10px] py-[5px] border-b border-neutral-500">
                        <a className="font-medium text-center">id</a>
                        <a className="font-medium text-center">firstName</a>
                        <a className="font-medium text-center">lastName</a>
                        <a className="font-medium text-center">middleName</a>
                        <a className="font-medium text-center">department_id</a>
                        <a className="font-medium text-center">position_id</a>
                    </div>
                    <div className="grid grid-cols-6 px-[10px] py-[8px]">
                        {users.map((user: User) => (
                            <>
                                <p className="text-center">{user.id}</p>
                                <p className="text-center">{user.firstName}</p>
                                <p className="text-center">{user.lastName}</p>
                                <p className="text-center">{user.middleName}</p>
                                <p className="text-center">{user.department_id}</p>
                                <p className="text-center">{user.position_id}</p>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-col gap-[10px]">
                <h4 className="font-medium">Департаменты</h4>
                <p className="text-gray-500">Список департаментов</p>
            </div>
            <div className="border border-neutral-500 rounded-[10px]">
                <div className="flex flex-col">
                    <div className="grid grid-cols-6 px-[10px] py-[5px] border-b border-neutral-500">
                        <a className="font-medium text-center">id</a>
                        <a className="font-medium text-center">name</a>
                    </div>
                    <div className="grid grid-cols-6 px-[10px] py-[8px]">
                        {departments.map((department: Department) => (
                            <>
                                <p className="text-center">{department.id}</p>
                                <p className="text-center">{department.name}</p>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-col gap-[10px]">
                <h4 className="font-medium">Должности</h4>
                <p className="text-gray-500">Список должностей</p>
            </div>
            <div className="border border-neutral-500 rounded-[10px]">
                <div className="flex flex-col">
                    <div className="grid grid-cols-6 px-[10px] py-[5px] border-b border-neutral-500">
                        <a className="font-medium text-center">id</a>
                        <a className="font-medium text-center">name</a>
                    </div>
                    <div className="grid grid-cols-6 px-[10px] py-[8px]">
                        {positions.map((position: Position) => (
                            <>
                                <p className="text-center">{position.id}</p>
                                <p className="text-center">{position.name}</p>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
}