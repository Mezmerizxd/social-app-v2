import { PrismaClient } from '@prisma/client';
import server from '../../server';
import handler from '../../helpers/handler';
import { AccountSettings } from '../../config';
import { hashPassword } from '../../helpers/generators';

export default (prisma: PrismaClient): void => {
  handler.POST(server.v1, '/account/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if values are not null
    if (!email || !password) {
      return {
        success: false,
        error: 'Missing fields',
        authorization: null,
      };
    }

    // Check if email exists
    const account = await prisma.accounts.findFirst({
      where: {
        email,
      },
    });
    if (!account) {
      return {
        success: false,
        error: 'Account does not exist',
        authorization: null,
      };
    }

    // Check if password is correct
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== account.password) {
      return {
        success: false,
        error: 'Incorrect password',
        authorization: null,
      };
    }

    return {
      success: true,
      authorization: account.authorization,
    };
  });
};
