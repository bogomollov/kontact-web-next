import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Неправильный формат почты" }).trim(),
  password: z
    .string()
    .min(3, { message: "Минимальная длина пароля 3 символа" })
    .trim(),
});

export type FormLoginState =
  | {
    errors?: {
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;

export const RegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Минимальная длина имени 2 символа" })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Минимальная длина фамилии 2 символа" })
    .trim(),
  middleName: z
    .string()
    .min(2, { message: "Минимальная длина отчества 2 символа" })
    .trim(),
  email: z.string().email({ message: "Неправильный формат почты" }).trim(),
  username: z
    .string()
    .min(3, { message: "Минимальная длина псевдонима 3 символа" })
    .trim(),
  password: z
    .string()
    .min(3, { message: "Минимальная длина пароля 3 символа" })
    .trim(),
});

export type FormRegisterState =
  | {
    errors?: {
      firstName?: string[];
      lastName?: string[];
      middleName?: string[];
      email?: string[];
      username?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;

export const UserFormSchema = z.object({
  account_id: z.string().trim(),
  firstName: z
    .string()
    .min(2, { message: "Минимальная длина имени 2 символа" })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Минимальная длина фамилии 2 символа" })
    .trim(),
  middleName: z
    .string()
    .min(2, { message: "Минимальная длина отчества 2 символа" })
    .trim(),
  file: z.any().refine((file) => file instanceof File, "Неверный формат файла").optional(),
});

export type UserFormState =
  | {
    errors?: {
      account_id?: string[];
      firstName?: string[];
      lastName?: string[];
      middleName?: string[];
    };
    message?: string;
  }
  | undefined;

export const AccountFormSchema = z.object({
  account_id: z.string().trim(),
  username: z.string().min(3, { message: "Минимальная длина псевдонима 3 символа" }).trim(),
  email: z.string().email({ message: "Неправильный формат почты" }).trim().optional(),
  phone: z.string().optional(),
});

export type AccountFormState =
  | {
    errors?: {
      account_id?: string[];
      username?: string[];
      email?: string[];
      phone?: string[];
    };
    message?: string;
  }
  | undefined;

export const PasswordFormSchema = z.object({
  account_id: z.string().trim(),
  currentPassword: z.string().min(3, { message: "Минимальная длина пароля 3 символа" }).trim(),
  newPassword: z.string().min(3, { message: "Минимальная длина пароля 3 символа" }).trim(),
  repeatPassword: z.string().min(3, { message: "Минимальная длина пароля 3 символа" }).trim(),
});

export type PasswordFormState =
  | {
    errors?: {
      account_id?: string[];
      currentPassword?: string[];
      newPassword?: string[];
      repeatPassword?: string[];
    };
    message?: string;
  }
  | undefined;