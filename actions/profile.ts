"use server";
import { deleteSession } from "@/lib/session";
import {
  AccountFormSchema,
  AccountFormState,
  PasswordFormSchema,
  PasswordFormState,
  UserFormSchema,
  UserFormState,
} from "@/lib/validation";
import { prisma } from "@/prisma/client";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import sharp from "sharp";

export async function updateAvatar(account_id: number, file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/avatars");
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, `${account_id}.png`);

  try {
    const roundedCorners = Buffer.from(
      '<svg><rect x="0" y="0" width="100" height="100" rx="100" ry="100"/></svg>',
    );
    const pngBuffer = await sharp(buffer)
      .resize(100, 100)
      .composite([
        {
          input: roundedCorners,
          blend: "dest-in",
        },
      ])
      .toFormat("png")
      .toBuffer();

    await fs.writeFile(filePath, pngBuffer);
  } catch (error) {
    console.error("Ошибка обработки изображения:", error);
    throw new Error("Ошибка обработки изображения");
  }
}

export async function updateUser(
  state: UserFormState | undefined,
  formData: FormData,
) {
  const validatedFields = UserFormSchema.safeParse({
    account_id: formData.get("account_id"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    middleName: formData.get("middleName"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { account_id, firstName, lastName, middleName } = validatedFields.data;

  const account = await prisma.account.findUnique({
    where: { id: Number(account_id) },
    select: {
      user_id: true,
    },
  });

  if (!account) {
    return { errors: { account_id: ["Аккаунт не найден"] } };
  }

  await prisma.user.update({
    where: { id: account?.user_id },
    data: { firstName, lastName, middleName },
  });

  redirect("/profile");
}

export async function updateAccount(
  state: AccountFormState | undefined,
  formData: FormData,
) {
  const validatedFields = AccountFormSchema.safeParse({
    account_id: formData.get("account_id"),
    username: formData.get("username"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { account_id, username, email, phone } = validatedFields.data;

  const account = await prisma.account.findUnique({
    where: { id: Number(account_id) },
  });

  if (!account) {
    return { errors: { account_id: ["Аккаунт не найден"] } };
  }

  await prisma.account.update({
    where: { id: Number(account_id) },
    data: { username, email, phone },
  });

  redirect("/profile");
}

export async function updatePassword(
  state: PasswordFormState | undefined,
  formData: FormData,
) {
  const validatedFields = PasswordFormSchema.safeParse({
    account_id: formData.get("account_id"),
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    repeatPassword: formData.get("repeatPassword"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { account_id, currentPassword, newPassword, repeatPassword } =
    validatedFields.data;

  if (newPassword != repeatPassword) {
    return { message: "Пароли не совпадают" };
  }

  const account = await prisma.account.findUnique({
    where: { id: Number(account_id) },
  });

  if (!account) {
    return { message: "Неправильный account_id" };
  }

  const passwordMatched = await compare(
    currentPassword,
    account.password || "",
  );
  if (!passwordMatched) {
    return {
      message: "Неправильный текущий пароль",
    };
  }

  const salt = genSaltSync(12);
  const passwordHash = hashSync(newPassword, salt);

  await prisma.account.update({
    where: { id: Number(account_id) },
    data: { password: passwordHash },
  });

  redirect("/profile");
}

export async function deleteAccount(account: number) {
  const findAccount = await prisma.account.findUnique({
    where: {
      id: account,
    },
    select: {
      id: true,
      user_id: true,
    },
  });

  await prisma.user.update({
    where: { id: findAccount?.user_id },
    data: { deletedAt: new Date() },
  });

  await prisma.account.update({
    where: {
      id: findAccount?.id,
    },
    data: { deletedAt: new Date() },
  });

  await deleteSession();
}
