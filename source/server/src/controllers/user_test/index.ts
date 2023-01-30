import { PrismaClient } from '@prisma/client';
import { socket } from '../../server';

export default (prisma: PrismaClient) => {
  socket.on('connection', async (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('test', () => {
      console.log('test used');
      socket.emit(`clientTest`, 'Hello from server');
    });

    socket.on('getAccount', async (data) => {
      console.log('getAccountDetails used');

      const where: Record<string, string> = {};
      where['token'] = data.token;
      const accountDetails = await prisma.user.findFirst({
        where,
      });

      console.log(accountDetails);

      if (!accountDetails) {
        await prisma.user.create({
          data: {
            token: data.token,
            email: 'test@test',
            name: 'test',
          },
        });
      }

      socket.emit(`setAccount`, { account: accountDetails });
    });
  });
};
