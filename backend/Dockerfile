FROM node:lts-slim AS builder
WORKDIR /backend
COPY backend/package*.json ./
COPY backend/prisma ./prisma
RUN apt-get update && \
    apt-get install -y build-essential python3 openssl && \
    rm -rf /var/lib/apt/lists/*
RUN npm i
COPY backend ./
COPY types ./types
COPY .env ./.env
RUN npx prisma generate
RUN npx tsc
RUN mkdir -p /backend/build/generated
RUN cp -r /backend/generated /backend/build
COPY backend/static ./static
RUN mv ./static /backend/build/static

FROM node:lts-slim AS production
WORKDIR /backend
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*
COPY --from=builder /backend/package*.json ./
COPY --from=builder /backend/node_modules ./node_modules
COPY --from=builder /backend/build ./build
COPY --from=builder /backend/build/generated ./build/generated
COPY --from=builder /backend/build/static ./build/static
COPY --from=builder /backend/prisma ./prisma
COPY --from=builder /backend/.env ./.env
EXPOSE 3001
CMD ["npm", "start"]