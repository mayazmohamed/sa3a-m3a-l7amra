FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm -g install pnpm

RUN pnpm install

COPY . .


CMD ["pnpm", "start"]