FROM node:14.6-alpine as development

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i -g pnpm
RUN pnpm install --only=development

COPY . .

RUN pnpm run build

FROM node:14.6-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g pnpm
RUN pnpm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]