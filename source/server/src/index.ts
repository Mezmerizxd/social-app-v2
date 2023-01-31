import { config } from 'dotenv';
import server from './server';
import { PrismaClient } from '@prisma/client';

config({ path: `${__dirname}/../../.env` });

const { PORT } = process.env;

// Controllers
import Controllers from './controllers';
import AccountController from './controllers/account';

const prisma = new PrismaClient();

Controllers();
AccountController(prisma);

server.api.use('/api/v1', server.v1);

server.http.listen(Number(PORT), () => {
  console.log(`Server is running on port ${PORT}`);
});
