import 'server-only'

import { prisma } from '@/prisma/client'
import { User } from '@prisma/client'
import { cache } from 'react'

import { createClient } from 'redis'

const redis = await createClient().on('error', err => console.log('Redis Client Error', err)).connect();

export const getChatList = cache(async (authUser: User) => {
    const chatList = await prisma.user.findMany({
        where: {
            NOT: {
                id: authUser?.id
            }
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    })

    return chatList
})

export const getChatWithUser = cache(async (findId: number) => {
    const [id, firstName, lastName, middleName, department_id, role_id] = await redis.hmGet(`user:${findId}`, ['id', 'firstName', 'lastName']);

    if (id) {
        let res = {
            id: Number(id),
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            department_id: Number(department_id),
            role_id: Number(role_id)
        }
        return res
    }
    else {
        const chatWithUser = await prisma.user.findUnique({
            where: {
                id: findId
            }
        })

        if (!chatWithUser) {
            return
        }

        await redis.hSet(`user:${findId}`, ['id', `${chatWithUser.id}`, 'firstName', `${chatWithUser.firstName}`, 'lastName', `${chatWithUser.lastName}`, 'middleName', `${chatWithUser.middleName}`, 'department_id', `${chatWithUser.department_id}`, 'position_id', `${chatWithUser.position_id}`])

        return chatWithUser
    }
})