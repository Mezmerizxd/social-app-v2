import { PrismaClient } from '@prisma/client';

// Controllers
import SignupController from './signup';
import LoginController from './login';

export default (prisma: PrismaClient): void => {
  SignupController(prisma);
  LoginController(prisma);
};
