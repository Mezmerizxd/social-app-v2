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
    if (err.error) return err;

    return {
      success: true,
      userId: profile.account.userId,
      username: profile.profile.username,
      email: profile.account.email,
      avatar: profile.profile.avatar,
      friends: profile.friends,
      friendRequestsReceived: profile.requestsReceived,
      friendRequestsSent: profile.requestsSent,
    };
  });

  handler.POST(server.v1, '/profile/change-username', async (req, res) => {
    const { authorization } = req.headers;
    const { username } = req.body;
    const profile = new Profile(prisma, authorization, 'token');
    const err = await profile.init();
    if (err.error) return err;

    if (!username) {
      return {
        success: false,
        error: 'Missing fields',
      };
    }

    const changeUsername = await profile.changeUsername(username);
    if (changeUsername.error) {
      return {
        success: false,
        error: changeUsername.error,
      };
    }
    return {
      success: true,
    };
  });
  handler.POST(server.v1, '/profile/change-avatar', async (req, res) => {
    const { authorization } = req.headers;
    const { avatar } = req.body;
    const profile = new Profile(prisma, authorization, 'token');
    const err = await profile.init();
    if (err.error) return err;

    if (!avatar) {
      return {
        success: false,
        error: 'Missing fields',
      };
    }

    const changeAvatar = await profile.changeAvatar(avatar);
    if (changeAvatar.error) {
      return {
        success: false,
        error: changeAvatar.error,
      };
    }
    return {
      success: true,
    };
  });
};
