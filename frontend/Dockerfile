FROM node:lts AS builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm i
COPY frontend ./
COPY types ./types
RUN npx next telemetry disable
RUN npm run build

FROM node:lts AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /frontend
COPY --from=builder /frontend/package*.json ./
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
CMD ["npm", "start"]