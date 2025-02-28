import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputLabel from "@/components/ui/InputLabel";
import Image from "next/image";
import Link from "next/link";
import { getAccount, getUser } from "@/lib/dal";

export default async function Profile() {
  const user = await getUser();
  const account = await getAccount();

  if (!user || !account) return null;

  const isAdmin = account.role_id == 2;

  return (
    <div className="flex flex-col items-center bg-neutral-50 min-h-screen">
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
      <h2>Личные настройки</h2>
      <h5 className="text-gray-600">Управляйте своими данными в один клик</h5>
      <div className="mt-6 grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg">
          <h4 className="font-medium">Информация профиля</h4>
          <p className="text-gray-500">Обновите сведения своего профиля</p>
          <div className="mt-4">
            <label className="block">Фотография</label>
            <Image src={"/avatars/" + account.id + ".svg"} alt='account-avatar' width={55} height={55} />
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="firstName">Имя</InputLabel>
              <Input id="firstName" name="firstName" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Имя" defaultValue={user.firstName} />
            </div>
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="lastName">Фамилия</InputLabel>
              <Input id="lastName" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Фамилия" defaultValue={user.lastName} />
            </div>
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="middleName">Отчество</InputLabel>
              <Input id="middleName" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Отчество" defaultValue={user.middleName} />
            </div>
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="department_id">Сфера деятельности</InputLabel>
            </div>
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="position_id">Должность</InputLabel>
            </div>
            <select className="w-full p-2 border rounded">
              <option>FullStack-разработчик</option>
            </select>
            <select className="w-full p-2 border rounded">
              <option>Ведущий эксперт</option>
            </select>
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md">Сохранить изменения</button>
        </div>
        <div className="bg-white p-6 rounded-lg">
          <h4 className="font-medium">Данные аккаунта</h4>
          <p className="text-neutral-500">Измените данные своего аккаунта</p>
          <div className="mt-4 space-y-3">
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="username">Отчество</InputLabel>
              <Input className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Отображаемое имя" defaultValue={account.username} />
            </div>
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="email">Эл.почта</InputLabel>
              <Input className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Электронная почта" defaultValue={account.email || undefined} />
            </div>
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="phone">Номер телефона</InputLabel>
              <Input className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Номер телефона" defaultValue={account.phone || undefined} />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4 bg-blue-500 text-white rounded-md">Сохранить изменения</Button>
        </div>
        <div className="bg-white p-6 rounded-lg">
          <h4 className="font-medium">Удаление аккаунта</h4>
          <p className="text-neutral-500">Безвозвратное удаление</p>
          <Button type="submit" className="w-full mt-4 bg-red-500 text-white rounded-md">Удалить аккаунт</Button>
        </div>
        <div className="bg-white p-6 rounded-lg">
          <h4 className="font-medium">Изменить пароль</h4>
          <p className="text-neutral-500">Используйте длинный пароль</p>
          <div className="mt-4 space-y-3">
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="currentPassword">Текущий пароль</InputLabel>
              <Input id="currentPassword" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Введите существующий пароль" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="newPassword">Новый пароль</InputLabel>
              <Input id="newPassword" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Придумайте безопасный пароль" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <InputLabel htmlFor="repeatPassword">Подтверждение пароля</InputLabel>
              <Input id="repeatPassword" className="focus:outline-blue-500 w-full border px-[14px] py-[10px] rounded-[10px]" placeholder="Повторите новый пароль" />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4 bg-blue-500 text-white rounded-md">Сохранить изменения</Button>
        </div>
      </div>
    </div>
  );
}