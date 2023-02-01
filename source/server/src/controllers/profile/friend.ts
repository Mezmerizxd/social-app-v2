import { PrismaClient } from '@prisma/client';
import server from '../../server';
import handler from '../../helpers/handler';
import Profile from '../../managers/profile';

export default (prisma: PrismaClient): void => {
  handler.POST(server.v1, '/profile/friends', async (req, res) => {
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
      friends: profile.friends,
    };
  });

  // handler.POST(server.v1, '/profile/friend-requests', async (req, res) => {});
  //
  // handler.POST(server.v1, '/profile/handle-friend-request', async (req, res) => {});
  //
  // handler.POST(server.v1, '/profile/add-friend', async (req, res) => {});
};
