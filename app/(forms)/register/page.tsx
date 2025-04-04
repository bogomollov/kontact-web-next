"use client";
import { register } from "@/actions/auth";
import InputError from "@/components/ui/InputError";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-[25px] md:max-w-md">
        <div className="flex flex-col items-center gap-[10px]">
          <h2>Регистрация</h2>
          <h5 className="text-neutral-500">
            Создайте аккаунт, чтобы общаться с коллегами
          </h5>
        </div>
        <form action={action} className="flex w-full flex-col gap-[20px]">
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="firstName">Имя</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="inline-flex rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="Введите имя"
                required
              />
              <InputError message={state?.errors?.firstName} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="lastName">Фамилия</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="inline-flex rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="Введите фамилию"
                required
              />
              <InputError message={state?.errors?.lastName} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="middleName">Отчество</label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                className="inline-flex rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="Введите отчество"
                required
              />
              <InputError message={state?.errors?.middleName} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="email">Электронная почта</label>
              <input
                id="email"
                name="email"
                type="email"
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="user@mail.ru"
                required
              />
              <InputError message={state?.errors?.email} />
              <InputError message={state?.message} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="username">Псевдоним</label>
              <input
                id="username"
                name="username"
                type="text"
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="Придумайте псевдоним"
                required
              />
              <InputError message={state?.errors?.username} />
            </div>
            <div className="flex w-full flex-col items-start gap-[8px]">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
                placeholder="••••••••••"
                required
              />
              <InputError message={state?.errors?.password} />
            </div>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-blue-500/80"
          >
            Создать аккаунт
          </button>
        </form>
        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex w-full items-center justify-between gap-4">
            <hr className="h-px w-full border-0 bg-neutral-300"></hr>
            <small className="text-neutral-500">ИЛИ</small>
            <hr className="h-px w-full border-0 bg-neutral-300"></hr>
          </div>
          <div className="flex w-full flex-col items-center gap-[25px]">
            <div className="flex w-full gap-[15px]">
              <button className="inline-flex w-full items-center justify-center gap-3 rounded-md border px-4 py-2">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-[20px]"
                >
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  ></path>
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  ></path>
                </svg>
                <p>Войти через Google</p>
              </button>
              {/* <button className="inline-flex justify-center items-center px-4 py-2 rounded-md border w-full gap-3">
                                <svg width="94" height="30" viewBox="0 0 94 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M93.1765 1.98266V22.1427H90.2365V1.98266H93.1765Z" fill="#2C2D2E" />
                                    <path d="M86.3133 7.86266V22.1427H83.3733V7.86266H86.3133ZM86.8733 3.57866C86.8733 4.64266 86.0053 5.62266 84.8573 5.62266C83.7653 5.62266 82.8133 4.72666 82.8133 3.57866C82.8133 2.45866 83.7653 1.56266 84.8573 1.56266C86.0053 1.56266 86.8733 2.54266 86.8733 3.57866Z" fill="#2C2D2E" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M71.7663 7.49867C67.6147 7.49867 64.2731 10.9054 64.2731 15.078C64.2731 19.2506 67.6147 22.6573 71.7663 22.6573C73.6739 22.6573 75.4105 21.9381 76.7305 20.7558L77.3759 22.1405H79.6038V7.84315H77.3759L76.6875 9.36203C75.373 8.20245 73.6533 7.49867 71.7663 7.49867ZM71.9386 10.3401C69.3775 10.3401 67.2773 12.448 67.2773 15.078C67.2773 17.7081 69.3775 19.8159 71.9386 19.8159C74.4997 19.8159 76.5999 17.7081 76.5999 15.078C76.5999 12.448 74.4997 10.3401 71.9386 10.3401Z" fill="#2C2D2E" />
                                    <path d="M45.8966 10.4387C43.9086 10.4387 42.3686 11.9507 42.3686 13.9667V22.1427H39.4286V7.86267H41.6823L42.3686 9.17867C43.3766 8.08667 44.8326 7.49867 46.4006 7.49867C48.2486 7.49867 49.7886 8.31067 50.8246 9.71067C52.0006 8.33867 53.7646 7.49867 55.7806 7.49867C59.3926 7.49867 61.8006 10.1587 61.8006 13.9667V22.1427H58.8606V14.0787C58.8606 11.8947 57.5726 10.4387 55.6126 10.4387C53.6246 10.4387 52.0846 11.9507 52.0846 13.9667V22.1427H49.1446V14.0787C49.1446 11.8947 47.8566 10.4387 45.8966 10.4387Z" fill="#2C2D2E" />
                                    <path d="M20.4408 15C20.4408 17.4881 18.4167 19.5122 15.9286 19.5122C13.4405 19.5122 11.4164 17.4881 11.4164 15C11.4164 12.5119 13.4405 10.4878 15.9286 10.4878C18.4167 10.4878 20.4408 12.5119 20.4408 15ZM15.9286 0C7.65797 0 0.928589 6.72938 0.928589 15C0.928589 23.2706 7.65797 30 15.9286 30C18.9586 30 21.8808 29.0981 24.3783 27.3909L24.4214 27.3609L22.4002 25.0116L22.3664 25.0341C20.4436 26.2706 18.217 26.925 15.9286 26.925C9.35297 26.925 4.00359 21.5756 4.00359 15C4.00359 8.42438 9.35297 3.075 15.9286 3.075C22.5042 3.075 27.8536 8.42438 27.8536 15C27.8536 15.8522 27.7589 16.7147 27.5723 17.5631C27.1955 19.1109 26.1117 19.5853 25.298 19.5225C24.4795 19.4559 23.5223 18.8728 23.5158 17.4459V16.3584V15C23.5158 10.8159 20.1127 7.41281 15.9286 7.41281C11.7445 7.41281 8.3414 10.8159 8.3414 15C8.3414 19.1841 11.7445 22.5872 15.9286 22.5872C17.9611 22.5872 19.867 21.7922 21.3042 20.3475C22.1395 21.6478 23.5017 22.4634 25.0514 22.5872C25.1845 22.5984 25.3205 22.6041 25.4555 22.6041C26.5458 22.6041 27.6277 22.2394 28.4995 21.5766C29.3986 20.8941 30.0698 19.9069 30.4411 18.7209C30.5002 18.5297 30.6089 18.0909 30.6098 18.0881L30.6127 18.0722C30.8311 17.1206 30.9286 16.1719 30.9286 15C30.9286 6.72938 24.1992 0 15.9286 0" fill="#0077FF" />
                                </svg>
                                Войти через Mail.ru
                            </button> */}
            </div>
            <div className="flex gap-2">
              <p>Уже есть аккаунт?</p>
              <Link href="/login" className="text-blue-500">
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
