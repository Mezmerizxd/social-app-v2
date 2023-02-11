import server, { socket } from '../server';
import handler from '../helpers/handler';
import { PrismaClient } from '@prisma/client';

export default (prisma: PrismaClient): void => {
  socket.on('connection', async (s) => {
    s.on('join', async (data) => {
      // Check theres data
      if (!data.authorization) return;
      if (!data.userId) return;
      // Verify the account exists and userId is connected to the account
      const account = await prisma.accounts.findFirst({
        where: {
          userId: data.userId,
          authorization: data.authorization,
        },
      });
      if (!account) return;
      if (account.userId !== data.userId) return;
      // Join the room
      s.join(data.userId);
      console.log(`User ${data.userId} has joined the socket`);
    });
  });

  handler.POST(server.v1, '/get-socket-details', (req, res) => {
    return {
      socketUrl: process.env.SERVER_SOCKET_CONNECTION,
      success: true,
    };
  });
};
