import { PrismaClient } from '@prisma/client';

// Controllers
import Controllers from './controllers';

// Managers
import Globe from './managers/globe';
import { statistics } from './managers/statistics';
import { server } from './managers/server';

const prisma = new PrismaClient();

Controllers(prisma);

Globe.init(prisma);

server.start(prisma);

statistics.start(prisma);
