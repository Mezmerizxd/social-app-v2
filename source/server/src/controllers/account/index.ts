import {PrismaClient} from '@prisma/client'

// Controllers
import SignupController from './signup'

export default (prisma: PrismaClient): void => {
  SignupController(prisma)
}