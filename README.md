# kontact-web-next
Описание: Современный корпоративный веб-мессенджер. Безопасные чаты, групповые обсуждения, файлообмен.

## Работа с базой данных

*Данные команды запускать из главной директории проекта*

### Во время разработки

Создание и применение миграции. Команда применит миграцию и сгенерирует Prisma Client
```bash
npx prisma migrate dev
```

Ручная генерация Prisma Client
```bash
npx prisma generate
```

Заполнение базы данных тестовыми данными
```bash
npx prisma db seed
```

Использование Prisma Studio
```bash
npx prisma studio
```

### Перед развертыванием веб-приложения

1. Запустить Prisma Client в production-окружении
```bash
npx prisma generate
```

2. Применить миграции
```bash
npx prisma migrate deploy
```

3. Запуск веб-приложения
```
docker compose up
```