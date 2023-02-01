import { config } from 'dotenv';
import server from './server';
import { PrismaClient } from '@prisma/client';
// Controllers
import Controllers from './controllers';
import AccountController from './controllers/account';
import ProfileController from './controllers/profile';

config({ path: `${__dirname}/../../.env` });

const { PORT } = process.env;

const prisma = new PrismaClient();

Controllers();
AccountController(prisma);
ProfileController(prisma);

server.api.use('/api/v1', server.v1);

server.http.listen(Number(PORT), (): void => {
  console.log(`Server is running on port ${PORT}`);
});
