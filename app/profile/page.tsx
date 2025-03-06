import Link from "next/link";
import { getAccount, getDepartments, getPositions, getUser } from "@/lib/dal";
import UpdateUserData from "@/components/profile/UpdateUserForm";
import UpdateAccountForm from "@/components/profile/UpdateAccountForm";
import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import DeleteAccountForm from "@/components/profile/DeleteAccountForm";

export default async function Profile() {
  const user = await getUser();
  const account = await getAccount();
  const departments = await getDepartments();
  const positions = await getPositions();

  if (!user || !account) return null;

  const isAdmin = account.role_id == 2;

  return (
    <div className="flex flex-col items-center bg-neutral-50 min-h-screen pb-[100px]">
      <div className="inline-flex justify-between w-full p-[10px]">
        <Link href="/dashboard" className="hover:bg-neutral-200/50 rounded-full p-[10px]">
          <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 8.875H1M1 8.875L8.875 16.75M1 8.875L8.875 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        {isAdmin &&
          <Link href="/admin" className="hover:bg-neutral-200/50 rounded-full p-[10px]">
            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9.125L22 9.125M22 9.125L14.125 1.25M22 9.125L14.125 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>}
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <h2>Личные настройки</h2>
        <h5 className="text-gray-600">Управляйте своими данными в один клик</h5>
      </div>
      <div className="mt-6 grid md:grid-cols-1 gap-7 w-full max-w-sm">
        <UpdateUserData
          user={user}
          account={account}
          department={departments.find(d => d.id === user.department_id)?.name}
          position={positions.find(p => p.id === user.position_id)?.name}
        />
        <UpdateAccountForm account={account} />
        <UpdatePasswordForm account={account.id} />
        <DeleteAccountForm account={account.id} />
      </div>
    </div>
  );
}