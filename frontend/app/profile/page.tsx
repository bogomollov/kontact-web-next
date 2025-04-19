import Link from "next/link";
import { IDepartment, IMe, IPosition } from "@/types";
import { apiFetch } from "@/lib/apiFetch";
import { cookies } from "next/headers";
import UpdateUserForm from "@/components/profile/UpdateUserForm";
import UpdateAccountForm from "@/components/profile/UpdateAccountForm";
import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import DeleteAccountForm from "@/components/profile/DeleteAccountForm";
import { Metadata } from "next";
import { getMe } from "../dashboard/layout";

export const metadata: Metadata = {
  title: "Профиль | kontact web",
  description:
    "Современный корпоративный веб-мессенджер. Безопасные чаты, групповые обсуждения, файлообмен и интеграция с корпоративными системами",
};

export default async function Profile() {
  const session = (await cookies()).get("session")?.value;

  const me: IMe = await getMe(session);

  const departmentData = await apiFetch("/departments", {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const departments: IDepartment[] =
    (await departmentData.json()) as IDepartment[];

  const positionData = await apiFetch("/positions", {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${session}`,
    },
    credentials: "include",
  });
  const positions: IPosition[] = (await positionData.json()) as IPosition[];

  if (!me) return null;

  const isAdmin = me.role_id === 2;

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-50 pb-[100px]">
      <div className="inline-flex w-full justify-between p-[10px]">
        <Link
          href="/dashboard"
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
        {isAdmin && (
          <Link
            href="/admin"
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
                d="M1 9.125L22 9.125M22 9.125L14.125 1.25M22 9.125L14.125 17"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <h2>Личные настройки</h2>
        <h5 className="text-gray-600">Управляйте своими данными в один клик</h5>
      </div>
      <div className="mt-6 grid w-full max-w-sm gap-7 md:grid-cols-1">
        <UpdateUserForm
          authUser={me}
          department={
            departments.find((d) => d.id === me.user.department_id)?.name
          }
          position={positions.find((p) => p.id === me.user.position_id)?.name}
        />
        <UpdateAccountForm authUser={me} />
        <UpdatePasswordForm authUser={me} />
        <DeleteAccountForm authUser={me} />
      </div>
    </div>
  );
}
