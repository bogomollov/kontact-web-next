import { getAccount, getUser } from "@/lib/dal";
import Link from "next/link";

export default async function Profile() {

    const user = await getUser()
    const account = await getAccount()

    if (!user || !account) return null

    const isAdmin = account.role_id == 2

    return (
        <div className="bg-neutral-50 h-screen">
            <div className="inline-flex justify-between w-full">
                <Link href="/dashboard" className="hover:bg-neutral-200 rounded-full p-[10px]">
                    <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 8.875H1M1 8.875L8.875 16.75M1 8.875L8.875 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                {isAdmin &&
                <Link href="/admin" className="hover:bg-neutral-100 rounded-full p-[10px]">
                    <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9.125L22 9.125M22 9.125L14.125 1.25M22 9.125L14.125 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>}
            </div>
            <div className="flex flex-1 flex-col">
                <div className="flex flex-col items-center justify-center gap-[25px]">
                    <div className="flex flex-col items-center gap-[5px]">
                        <h2>Личные настройки</h2>
                        <h5 className="text-neutral-500">Управляйте своими данными в один клик</h5>
                    </div>
                    <div className="flex items-start justify-center">
                        <div className="flex flex-col justify-between">
                            <div className="flex p-[35px] rounded-[10px] bg-white border border-neutral-200">
                                <div className="flex flex-col gap-[8px]">
                                    <h4 className="font-medium">Информация профиля</h4>
                                    <p className="text-neutral-500">Обновите сведения своего профиля</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}