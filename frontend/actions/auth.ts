// "use server";
// import { createSession, deleteSession } from "@/lib/session";
// import {
//   LoginFormSchema,
//   FormLoginState,
//   RegisterFormSchema,
//   FormRegisterState,
// } from "@/lib/validation";
// import { compare, genSaltSync, hashSync } from "bcrypt-ts";
// import { redirect } from "next/navigation";

// export async function login(state: FormLoginState, formData: FormData) {
//   const validatedFields = LoginFormSchema.safeParse({
//     email: formData.get("email"),
//     password: formData.get("password"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const { email, password } = validatedFields.data;

//   const account = await prisma.account.findUnique({
//     where: {
//       email: email,
//       deletedAt: null,
//     },
//     select: {
//       email: true,
//       password: true,
//       user_id: true,
//       username: true,
//       role: true,
//     },
//   });

//   if (!account) {
//     return {
//       message: "Неправильный логин или пароль",
//     };
//   }

//   if (!account.password) {
//     return {
//       message: "Не удалось войти в учетную запись",
//     };
//   }

//   const passwordMatched = await compare(password, account.password);
//   if (!passwordMatched) {
//     return {
//       message: "Неправильный логин или пароль",
//     };
//   }

//   const userData = {
//     user_id: account.user_id,
//     username: account.username,
//     role: account.role.name,
//   };

//   await createSession(userData);

//   redirect("/dashboard");
// }

// export async function register(state: FormRegisterState, formData: FormData) {
//   const validatedFields = RegisterFormSchema.safeParse({
//     firstName: formData.get("firstName"),
//     lastName: formData.get("lastName"),
//     middleName: formData.get("middleName"),
//     email: formData.get("email"),
//     username: formData.get("username"),
//     password: formData.get("password"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const { firstName, lastName, middleName, email, username, password } =
//     validatedFields.data;

//   redirect("/dashboard");
// }

// export async function logout() {
//   await deleteSession();
// }
