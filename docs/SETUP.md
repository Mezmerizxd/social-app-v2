# Setup Tutorial

## Prerequisites
- [Node.js](https://nodejs.org/en/) - v16.17.0
- [Postgres](https://www.postgresql.org/)
- [Yarn](https://yarnpkg.com/) - v1.22.19

## Setup
1. Clone the repo
2. Install dependencies
```bash
yarn install
```
3. Create a `.env` file in the root directory
4. Add the following to the `.env` file
```bash
PORT=3000
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/socialapp?schema=public"
SERVER_SOCKET_CONNECTION=http://localhost:3000/socket
SERVER_API_CONNECTION=http://localhost:3000/api
EMAIL_USER=<email>
EMAIL_PASS=<password>
```
5. Initialize the database with prisma
```bash
yarn prisma migrate dev --name init
```
6. Deploy & generate the prisma schema
```bash
yarn migrate
yarn generate
```

## Run
1. Start the server
```bash
yarn start
```
2. Watch
```bash
yarn watch
```
3. Build
```bash
yarn build
```
4. Go to [http://localhost:3000](http://localhost:3000)

### Documentation [Documentation](DOCS.md)