import { PrismaClient } from '@prisma/client';
import handler from '../../helpers/handler';
import server, { socket } from '../../server';
import Profile from '../../managers/profile';

export default (prisma: PrismaClient) => {
  handler.POST(server.v1, '/messaging/delete-message', async (req, res) => {
    const { messageId, messageGroupId } = req.body;
    const { authorization } = req.headers;

    const profile = new Profile(prisma, authorization, 'token');
    const profileErr = await profile.init();
    if (profileErr.error) return profileErr;

    // Check if they are in the message group
    if (!profile.profile.messageGroups.includes(messageGroupId)) {
      return {
        success: false,
        error: 'You are not in this message group.',
      };
    }

    // Check if they are the owner of the message
    const message = await prisma.messages.findFirst({
      where: {
        messageId: messageId,
      },
    });
    if (!message) {
      return {
        success: false,
        error: 'Message not found.',
      };
    }

    if (message.userId !== profile.account.userId) {
      return {
        success: false,
        error: 'You are not the owner of this message.',
      };
    }

    // Delete the message
    await prisma.messages.deleteMany({
      where: {
        groupId: messageGroupId,
        messageId: messageId,
      },
    });

    return {
      success: true,
    };
  });

  handler.POST(server.v1, '/messaging/edit-message', async (req, res) => {
    const { messageId, messageGroupId, message } = req.body;
    const { authorization } = req.headers;

    const profile = new Profile(prisma, authorization, 'token');
    const profileErr = await profile.init();
    if (profileErr.error) return profileErr;

    // Check if they are in the message group
    if (!profile.profile.messageGroups.includes(messageGroupId)) {
      return {
        success: false,
        error: 'You are not in this message group.',
      };
    }

    // Check if they are the owner of the message
    const message2 = await prisma.messages.findFirst({
      where: {
        messageId: messageId,
      },
    });
    if (!message2) {
      return {
        success: false,
        error: 'Message not found.',
      };
    }

    if (message2.userId !== profile.account.userId) {
      return {
        success: false,
        error: 'You are not the owner of this message.',
      };
    }

    // Edit the message
    await prisma.messages.updateMany({
      where: {
        groupId: messageGroupId,
        messageId: messageId,
      },
      data: {
        message: message,
      },
    });

    return {
      success: true,
    };
  });
};
