FROM node:lts AS builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm i
COPY frontend ./
COPY types ./types
COPY .env ./.env
RUN npx next telemetry disable
RUN npm run build

FROM node:lts AS production
WORKDIR /frontend
COPY --from=builder /frontend/package*.json ./
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.env ./.env
EXPOSE 3000
CMD ["npm", "start"]