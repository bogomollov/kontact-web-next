"use client";
import Input from "../ui/Input";
import InputLabel from "../ui/InputLabel";
import Button from "../ui/Button";
import InputError from "../ui/InputError";
import { FormErrors, FormState, IMe } from "@/types";
import imageLoader from "@/lib/imageLoader";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiFetch";
import Image from "next/image";

interface FormData {
  firstName: string;
  lastName: string;
  middleName: string;
  image: string | undefined;
  newImage: File | null;
}

export default function UpdateUserForm({
  authUser,
  department,
  position,
}: {
  authUser: IMe;
  department?: string;
  position?: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: authUser.user.firstName,
    lastName: authUser.user.lastName,
    middleName: authUser.user.middleName,
    image: authUser.image,
    newImage: null,
  });
  const [pending, setPending] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, newImage: file });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(undefined);
    setPending(true);
    setMessage(undefined);

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("middleName", formData.middleName);

    if (formData.newImage) {
      data.append("image", formData.newImage);
    }

    try {
      const response = await apiFetch(`/users/${authUser.id}`, {
        method: "PATCH",
        body: data,
        credentials: "include",
      });

      const responseData: FormState = await response.json();

      if (response.ok) {
        router.refresh();
      }
      if (responseData?.errors) {
        setErrors(responseData.errors);
      }
    } catch {
      setMessage("Ошибка при подключении к серверу");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-6"
      encType="multipart/form-data"
    >
      <div className="flex flex-col gap-[8px]">
        <h4 className="font-medium">Информация профиля</h4>
        <p className="text-neutral-500">Обновите сведения своего профиля</p>
      </div>
      <div className="flex flex-col gap-2">
        <Image
          loader={imageLoader}
          src={
            formData.newImage
              ? URL.createObjectURL(formData.newImage)
              : `${formData.image}`
          }
          width={55}
          height={55}
          alt={`avatar ${authUser.id}`}
          className="h-[55px] w-[55px] cursor-pointer rounded-full border"
          onClick={handleAvatarClick}
          onError={() =>
            setFormData({ ...formData, image: "/static/null.png" })
          }
        />
        <Input
          id="image"
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel htmlFor="firstName">Имя</InputLabel>
        <Input
          id="firstName"
          type="text"
          name="firstName"
          onChange={handleChange}
          defaultValue={formData.firstName}
          className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
        />
        <InputError message={errors?.firstName} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel htmlFor="lastName">Фамилия</InputLabel>
        <Input
          id="lastName"
          type="text"
          name="lastName"
          defaultValue={formData.lastName}
          className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
        />
        <InputError message={errors?.lastName} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel htmlFor="middleName">Отчество</InputLabel>
        <Input
          id="middleName"
          type="text"
          name="middleName"
          defaultValue={formData.middleName}
          className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
        />
        <InputError message={errors?.middleName} />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel>Сфера деятельности</InputLabel>
        <Input
          defaultValue={department}
          className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
          disabled
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <InputLabel>Должность</InputLabel>
        <Input
          defaultValue={position}
          className="inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500"
          disabled
        />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-md bg-blue-500 text-white disabled:bg-blue-500/80"
      >
        Сохранить изменения
      </Button>
    </form>
  );
}
