"use server"
import { createSession, deleteSession } from "@/lib/session";
import { LoginFormSchema, FormLoginState, RegisterFormSchema, FormRegisterState } from "@/lib/validation"
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

import { prisma } from '@/prisma/client'

export async function login(state: FormLoginState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    const account = await prisma.account.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            password: true,
            user_id: true,
            username: true,
            role: true,
        }
    })

    if (!account) {
        return {
            message: 'Неправильный логин или пароль'
        }
    }

    if (!account.password) {
        return {
            message: 'Не удалось войти в учетную запись'
        }
    }

    const passwordMatched = await compare(password, account.password);
    if (!passwordMatched) {
        return {
            message: 'Неправильный логин или пароль'
        }
    }

    const userData = {
        user_id: account.user_id,
        username: account.username,
        role: account.role.name,
    }

    await createSession(userData);

    redirect('/dashboard')
}

export async function register(state: FormRegisterState, formData: FormData) {
    const validatedFields = RegisterFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        middleName: formData.get('middleName'),
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { firstName, lastName, middleName, email, username, password } = validatedFields.data

    const emailFind = await prisma.account.findUnique({
        where: {
            email: email
        },
        select: {
            email: true
        }
    })

    if (emailFind) {
        return {
            message: 'Аккаунт с такой почтой уже существует'
        }
    }

    const userFind = await prisma.account.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
        }
    })

    if (userFind) {
        return {
            message: 'Пользователь с таким псевдонимом уже существует'
        }
    }

    const salt = genSaltSync(12);
    const passwordHash = hashSync(password, salt);

    const newUser = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
        }
    })

    const account = await prisma.account.create({
        data: {
            user_id: newUser.id,
            username: username,
            password: passwordHash,
            email: email,
            role_id: 1,
        }
    })

    const userData = {
        user_id: account.user_id,
        username: account.username,
        role: 'user',
    }

    await createSession(userData);

    redirect('/dashboard')
}

export async function logout() {
    await deleteSession()
}