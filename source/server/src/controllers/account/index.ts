import { PrismaClient } from '@prisma/client';

// Controllers
import SignupController from './signup';
import LoginController from './login';
import VerifyEmailController from './verify_email';

export default (prisma: PrismaClient): void => {
  SignupController(prisma);
  LoginController(prisma);
  VerifyEmailController(prisma);
};
