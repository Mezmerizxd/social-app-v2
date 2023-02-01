import { PrismaClient } from '@prisma/client';

// Controllers
import Profile from './profile';
import Friend from './friend';
export default (prisma: PrismaClient): void => {
  Profile(prisma);
  Friend(prisma);
};
