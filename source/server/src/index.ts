import {config} from 'dotenv';
import server from './server';
import {PrismaClient} from '@prisma/client';
// Controllers
import Controllers from './controllers';
import AccountController from './controllers/account';

config({ path: `${__dirname}/../../.env` });

const { PORT } = process.env;

const prisma = new PrismaClient();

Controllers();
AccountController(prisma);

server.api.use('/api/v1', server.v1);

server.http.listen(Number(PORT), () => {
  console.log(`Server is running on port ${PORT}`);
});
