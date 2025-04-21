FROM node:lts-slim
WORKDIR /backend
RUN apt-get update && apt-get install -y build-essential python3
COPY ./backend ./
RUN npm install
RUN npx prisma generate
COPY ./types ./types

RUN npx tsc

RUN npm ci

EXPOSE 3001
CMD ["sh", "-c", "npm run db:deploy && npx prisma db seed && node dist/server.js"]