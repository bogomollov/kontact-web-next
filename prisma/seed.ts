import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { genSaltSync, hashSync } from "bcrypt-ts";

async function main() {

    const salt = genSaltSync(12);
    const admin_password = hashSync('admin', salt);
    const user_password = hashSync('user', salt);

    const role = await prisma.role.upsert({
        where: { name: 'user' },
        update: {},
        create: {
            name: 'user'
        }
    })

    const role2 = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin'
        } 
    })

    const department = await prisma.department.upsert({
        where: { name: 'Развитие цифровых технологий' },
        update: {},
        create: {
            name: 'Развитие цифровых технологий',
        }
    })

    const department2 = await prisma.department.upsert({
        where: { name: 'Организация работы и контроля' },
        update: {},
        create: {
            name: 'Организация работы и контроля',
        }
    })

    const position = await prisma.position.upsert({
        where: { name: 'Ведущий эксперт' },
        update: {},
        create: {
            name: 'Ведущий эксперт',
        }
    })

    const position2 = await prisma.position.upsert({
        where: { name: 'Главный специалист' },
        update: {},
        create: {
            name: 'Главный специалист',
        }
    })

    const user = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            firstName: 'Ксения',
            lastName: 'Соколова',
            middleName: 'Константиновна',
            department_id: department.id,
            position_id: position.id,
        },
    })
    await prisma.account.upsert({
        where: { username: 'ksenia' },
        update: {},
        create: {
            user_id: user.id,
            username: 'ksenia',
            email: 'user@mail.ru',
            password: user_password,
            role_id: role.id,
        },
    })

    const admin = await prisma.user.upsert({
        where: { id: 2 },
        update: {},
        create: {
            firstName: 'Виктор',
            lastName: 'Андреев',
            middleName: 'Алексеевич',
            department_id: department2.id,
            position_id: position2.id,
        }, 
    })
    await prisma.account.upsert({
        where: { username: 'victor' },
        update: {},
        create: {
            user_id: admin.id,
            username: 'victor',
            email: 'admin@mail.ru',
            password: admin_password,
            role_id: role2.id,
        },
    })
}
main()
.then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})