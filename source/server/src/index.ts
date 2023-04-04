import { config } from 'dotenv';
import server from './server';
import { PrismaClient } from '@prisma/client';
import { statistics } from './statistics';

// Controllers
import Controllers from './controllers';

// Managers
import Globe from './managers/globe';

config({ path: `${__dirname}/../../../.env` });

const { PORT } = process.env;

const prisma = new PrismaClient();

Controllers(prisma);

Globe.init(prisma);

server.api.use('/api/v1', server.v1);

server.http.listen(Number(PORT), (): void => {
  console.log(`Server is running on port ${PORT}`);
});

statistics.start();
