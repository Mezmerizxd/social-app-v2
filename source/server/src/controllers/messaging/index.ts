import { PrismaClient } from '@prisma/client';
import handler from '../../helpers/handler';
import server, { socket } from '../../server';
import Profile from '../../managers/profile';
import { createMessageId } from '../../helpers/generators';
import MessageController from './message';

export default (prisma: PrismaClient) => {
  MessageController(prisma);

  socket.on('connection', async (s) => {
    s.on('sendMessage', async (data) => {
      const profile = new Profile(prisma, data.authorization, 'token');
      const profileErr = await profile.init();
      if (profileErr.error) return profileErr;
      const friend = new Profile(prisma, data.to, 'id');
      const friendErr = await friend.init();
      if (friendErr.error) return friendErr;
      const messageGroupId = (parseInt(profile.account.userId) + parseInt(friend.account.userId)).toString();
      let messageGroup = await prisma.messageGroups.findFirst({
        where: {
          groupId: messageGroupId,
        },
      });
      if (!messageGroup) return;
      const messageId = await createMessageId(prisma, messageGroupId);
      if (!messageId) return;
      await prisma.messages.create({
        data: {
          messageId: messageId,
          message: data.message,
          avatar: profile.profile.avatar,
          username: profile.profile.username,
          userId: profile.account.userId,
          groupId: messageGroupId,
        },
      });

      socket.to(messageGroupId).emit('message', {
        message: data.message,
        avatar: profile.profile.avatar,
        username: profile.profile.username,
        userId: profile.account.userId,
        createdAt: new Date().toString(),
        messageId: messageId,
      });
    });

    s.on('joinMessageGroup', async (data) => {
      const profile = new Profile(prisma, data.authorization, 'token');
      const profileErr = await profile.init();
      if (profileErr.error) return profileErr;

      // check they are in the message group
      if (profile.profile.messageGroups.includes(data.messageGroupId)) {
        s.join(data.messageGroupId);
      }
    });

    s.on('leaveMessageGroup', async (data) => {
      s.leave(data.messageGroupId);
    });

    s.on('disconnect', () => {});
  });

  handler.POST(server.v1, '/messaging/get-message-group', async (req, res) => {
    const { userId } = req.body;
    const { authorization } = req.headers;
    // Get profile
    const profile = new Profile(prisma, authorization, 'token');
    const profileErr = await profile.init();
    if (profileErr.error) return profileErr;
    // Get friend
    const friend = new Profile(prisma, userId, 'id');
    const friendErr = await friend.init();
    if (friendErr.error) return friendErr;
    // Message group id
    const messageGroupId = (parseInt(profile.account.userId) + parseInt(friend.account.userId)).toString();
    // Get message group
    let messageGroup = await prisma.messageGroups.findFirst({
      where: {
        groupId: messageGroupId,
      },
    });
    if (!messageGroup) {
      // Create message group
      await prisma.messageGroups.create({
        data: {
          groupId: messageGroupId,
          name: `${profile.profile.username} & ${friend.profile.username}`,
        },
      });

      // Add message group to profiles
      await prisma.profiles.update({
        where: {
          userId: profile.account.userId,
        },
        data: {
          messageGroups: {
            set: [...profile.profile.messageGroups, messageGroupId],
          },
        },
      });
      await prisma.profiles.update({
        where: {
          userId: friend.account.userId,
        },
        data: {
          messageGroups: {
            set: [...friend.profile.messageGroups, messageGroupId],
          },
        },
      });
    }

    // Get messages
    const messages = await prisma.messages.findMany({
      where: {
        groupId: messageGroupId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      success: true,
      messageGroupId: messageGroupId,
      messages: messages,
    };
  });
};
