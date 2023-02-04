import { PrismaClient } from '@prisma/client';
import server from '../../server';
import handler from '../../helpers/handler';

export default (prisma: PrismaClient): void => {
  handler.POST(server.v1, '/account/verify-email', async (req, res) => {
    const code: any = req.query.code;

    if (!code) {
      return {success: false, error: 'Missing fields'}
    }

    const account = await prisma.accounts.findFirst({
      where: {
        verificationCode: code
      }
    });

    if (!account) {
      return {success: false, error: 'Invalid code'}
    }

    await prisma.accounts.update({
      where: {
        userId: account.userId
      },
      data: {
        verifiedEmail: true
      }
    });

    return {success: true}
  })
};