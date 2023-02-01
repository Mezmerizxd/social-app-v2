import { PrismaClient } from '@prisma/client';
import server from '../../server';
import handler from '../../helpers/handler';
import { AccountSettings } from '../../config';
import Profile from '../../managers/profile';

export default (prisma: PrismaClient): void => {
  handler.POST(server.v1, '/profile', async (req, res) => {
    const { authorization } = req.headers;
    const profile = new Profile(prisma, authorization, 'token');
    const err = await profile.init();
    if (err.error) {
      return {
        success: false,
        error: err.error,
      };
    }

    return {
      success: true,
      userId: profile.account.userId,
      username: profile.profile.username,
      email: profile.account.email,
      avatar: profile.profile.avatar,
    };
  });
};
