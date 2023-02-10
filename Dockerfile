FROM node:16.17.0

WORKDIR /usr/src/social-app-v2/

COPY ./package.json ./

COPY . .

RUN yarn

CMD ["yarn", "start"]

EXPOSE 3000