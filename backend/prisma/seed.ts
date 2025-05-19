import { PrismaClient } from "../generated/prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

async function main() {
  const salt = genSaltSync(12);
  const admin_password = hashSync("admin", salt);

  await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
    },
  });
  const role2 = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
    },
  });

  const department = await prisma.department.upsert({
    where: { name: "Отдел развития цифровых технологий" },
    update: {},
    create: {
      name: "Отдел развития цифровых технологий",
    },
  });
  const department2 = await prisma.department.upsert({
    where: { name: "Отдел цифрового развития в финансово-экономической сфере" },
    update: {},
    create: {
      name: "Отдел цифрового развития в финансово-экономической сфере",
    },
  });
  const department3 = await prisma.department.upsert({
    where: { name: "Отдел цифрового развития в социальной сфере" },
    update: {},
    create: {
      name: "Отдел цифрового развития в социальной сфере",
    },
  });
  const department4 = await prisma.department.upsert({
    where: {
      name: "Отдел цифрового развития в сфере государственного управления",
    },
    update: {},
    create: {
      name: "Отдел цифрового развития в сфере государственного управления",
    },
  });
  const department5 = await prisma.department.upsert({
    where: {
      name: "Отдел цифрового развития местного самоуправления",
    },
    update: {},
    create: {
      name: "Отдел цифрового развития местного самоуправления",
    },
  });
  const department6 = await prisma.department.upsert({
    where: {
      name: "Отдел геоинформационных систем",
    },
    update: {},
    create: {
      name: "Отдел геоинформационных систем",
    },
  });
  const department7 = await prisma.department.upsert({
    where: {
      name: "Управление связи и коммуникаций",
    },
    update: {},
    create: {
      name: "Управление связи и коммуникаций",
    },
  });

  const position = await prisma.position.upsert({
    where: { name: "Консультант" },
    update: {},
    create: {
      name: "Консультант",
    },
  });
  const position2 = await prisma.position.upsert({
    where: { name: "Главный специалист" },
    update: {},
    create: {
      name: "Главный специалист",
    },
  });
  const position3 = await prisma.position.upsert({
    where: { name: "Старший специалист" },
    update: {},
    create: {
      name: "Старший специалист",
    },
  });
  const position4 = await prisma.position.upsert({
    where: { name: "Ведущий эксперт" },
    update: {},
    create: {
      name: "Ведущий эксперт",
    },
  });
  const position5 = await prisma.position.upsert({
    where: { name: "Специалист 2 разряда" },
    update: {},
    create: {
      name: "Специалист 2 разряда",
    },
  });
  const position6 = await prisma.position.upsert({
    where: { name: "Помощник министра" },
    update: {},
    create: {
      name: "Помощник министра",
    },
  });
  const position7 = await prisma.position.upsert({
    where: { name: "Помощник министра" },
    update: {},
    create: {
      name: "Помощник министра",
    },
  });

  const admin = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: "Виктор",
      lastName: "Андреев",
      middleName: "Алексеевич",
      department_id: department2.id,
      position_id: position2.id,
    },
  });
  await prisma.account.upsert({
    where: { username: "victor" },
    update: {},
    create: {
      user_id: admin.id,
      username: "victor",
      email: "admin@mail.ru",
      password: admin_password,
      role_id: role2.id,
    },
  });

  const chatGroup = await prisma.chat.upsert({
    where: { id: 2 },
    update: {},
    create: {
      type: "group",
      name: "Общая группа",
    },
  });
  const chatGroup2 = await prisma.chat.upsert({
    where: { id: 2 },
    update: {},
    create: {
      type: "group",
      name: "Отдел развития цифровых технологий",
    },
  });
  const chatGroup3 = await prisma.chat.upsert({
    where: { id: 3 },
    update: {},
    create: {
      type: "group",
      name: "Отдел цифрового развития в финансово-экономической сфере",
    },
  });
  const chatGroup4 = await prisma.chat.upsert({
    where: { id: 4 },
    update: {},
    create: {
      type: "group",
      name: "Отдел цифрового развития в социальной сфере",
    },
  });
  const chatGroup5 = await prisma.chat.upsert({
    where: { id: 5 },
    update: {},
    create: {
      type: "group",
      name: "Отдел цифрового развития в сфере государственного управления",
    },
  });
  const chatGroup6 = await prisma.chat.upsert({
    where: { id: 6 },
    update: {},
    create: {
      type: "group",
      name: "Отдел цифрового развития местного самоуправления",
    },
  });
  const chatGroup7 = await prisma.chat.upsert({
    where: { id: 7 },
    update: {},
    create: {
      type: "group",
      name: "Отдел геоинформационных систем",
    },
  });
  const chatGroup8 = await prisma.chat.upsert({
    where: { id: 7 },
    update: {},
    create: {
      type: "group",
      name: "Управление связи и коммуникаций",
    },
  });
  const chatGroup9 = await prisma.chat.upsert({
    where: { id: 8 },
    update: {},
    create: {
      type: "group",
      name: "Отдел планирования, финансирования и государственного заказа",
    },
  });
  const chatGroup10 = await prisma.chat.upsert({
    where: { id: 9 },
    update: {},
    create: {
      type: "group",
      name: "Отдел правовой, кадровой и антикоррупционной работы",
    },
  });
  const chatGroup11 = await prisma.chat.upsert({
    where: { id: 10 },
    update: {},
    create: {
      type: "group",
      name: "Организация работы и контроля",
    },
  });
  const chatGroup12 = await prisma.chat.upsert({
    where: { id: 11 },
    update: {},
    create: {
      type: "group",
      name: "Управление информационной безопасности",
    },
  });
  const chatGroup13 = await prisma.chat.upsert({
    where: { id: 12 },
    update: {},
    create: {
      type: "group",
      name: "Управление проектной деятельности",
    },
  });

  await prisma.message.upsert({
    where: { id: 1 },
    update: {},
    create: {
      chat_id: chatGroup.id,
      sender_id: admin.id,
      content: "Это тестовое сообщение в общей группе",
    },
  });
  await prisma.message.upsert({
    where: { id: 2 },
    update: {},
    create: {
      chat_id: chatGroup2.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел развития цифровых технологий"',
    },
  });
  await prisma.message.upsert({
    where: { id: 3 },
    update: {},
    create: {
      chat_id: chatGroup3.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел цифрового развития в финансово-экономической сфере"',
    },
  });
  await prisma.message.upsert({
    where: { id: 4 },
    update: {},
    create: {
      chat_id: chatGroup4.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел цифрового развития в социальной сфере"',
    },
  });
  await prisma.message.upsert({
    where: { id: 5 },
    update: {},
    create: {
      chat_id: chatGroup5.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел цифрового развития в сфере государственного управления"',
    },
  });
  await prisma.message.upsert({
    where: { id: 6 },
    update: {},
    create: {
      chat_id: chatGroup6.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел цифрового развития местного самоуправления"',
    },
  });
  await prisma.message.upsert({
    where: { id: 7 },
    update: {},
    create: {
      chat_id: chatGroup7.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел геоинформационных систем"',
    },
  });
  await prisma.message.upsert({
    where: { id: 8 },
    update: {},
    create: {
      chat_id: chatGroup8.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Управление связи и коммуникаций"',
    },
  });
  await prisma.message.upsert({
    where: { id: 9 },
    update: {},
    create: {
      chat_id: chatGroup9.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел планирования, финансирования и государственного заказа"',
    },
  });
  await prisma.message.upsert({
    where: { id: 10 },
    update: {},
    create: {
      chat_id: chatGroup10.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел правовой, кадровой и антикоррупционной работы"',
    },
  });
  await prisma.message.upsert({
    where: { id: 11 },
    update: {},
    create: {
      chat_id: chatGroup11.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Отдел организации работы и контроля"',
    },
  });
  await prisma.message.upsert({
    where: { id: 12 },
    update: {},
    create: {
      chat_id: chatGroup12.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Управление информационной безопасности"',
    },
  });
  await prisma.message.upsert({
    where: { id: 13 },
    update: {},
    create: {
      chat_id: chatGroup13.id,
      sender_id: admin.id,
      content:
        'Это тестовое сообщение в группе "Управление проектной деятельности"',
    },
  });

  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup2.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup2.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup3.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup3.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup4.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup4.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup5.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup5.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup6.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup6.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup7.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup7.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup8.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup8.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup9.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup9.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup10.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup10.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup11.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup11.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup12.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup12.id,
      user_id: admin.id,
    },
  });
  await prisma.chatMember.upsert({
    where: { chat_id_user_id: { chat_id: chatGroup13.id, user_id: admin.id } },
    update: {},
    create: {
      chat_id: chatGroup13.id,
      user_id: admin.id,
    },
  });
}
main()
  .then(async () => {
    console.log("Заполнение базы данных прошло успешно");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
