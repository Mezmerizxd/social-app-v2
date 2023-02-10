FROM node:16.17.0

WORKDIR /usr/src/social-app-v2/

COPY ./package.json ./

COPY . .

RUN yarn

RUN yarn prisma migrate deploy

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3000