FROM node:16.17.0

WORKDIR /usr/src/

COPY ./package.json ./

COPY . .

RUN yarn --production=true

RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3001 3002