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
