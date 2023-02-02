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

  handler.POST(server.v1, '/profile/friend-requests', async (req, res) => {
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
      sent: profile.requestsSent,
      received: profile.requestsReceived,
    };
  });

  handler.POST(server.v1, '/profile/handle-friend-request', async (req, res) => {
    const { authorization } = req.headers;
    const { userId, action } = req.body;

    if (!userId) {
      return {
        success: false,
        error: 'Missing fields',
      };
    }

    const profile = new Profile(prisma, authorization, 'token');
    const err = await profile.init();
    if (err.error) {
      return {
        success: false,
        error: err.error,
      };
    }

    const friend = await prisma.profiles.findFirst({
      where: {
        userId,
      },
    });
    if (!friend) {
      return {
        success: false,
        error: 'User does not exist',
      };
    }

    const handleRequest = await profile.handleFriend(friend.userId, action);
    if (handleRequest.error) {
      return {
        success: false,
        error: handleRequest.error,
      };
    }
    return { success: true };
  });

  handler.POST(server.v1, '/profile/add-friend', async (req, res) => {
    const { authorization } = req.headers;
    const { username } = req.body;

    if (!username) {
      return {
        success: false,
        error: 'Missing fields',
      };
    }

    const profile = new Profile(prisma, authorization, 'token');
    const err = await profile.init();
    if (err.error) {
      return {
        success: false,
        error: err.error,
      };
    }

    if (profile.profile.username === username) {
      return {
        success: false,
        error: 'You cannot add yourself',
      };
    }

    const friend = await prisma.profiles.findFirst({
      where: {
        username,
      },
    });
    if (!friend) {
      return {
        success: false,
        error: 'User does not exist',
      };
    }

    const sendRequest = await profile.handleFriend(friend.userId, 'send');
    if (sendRequest.error) {
      return {
        success: false,
        error: sendRequest.error,
      };
    }

    return {
      success: true,
    };
  });
};
