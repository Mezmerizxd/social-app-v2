import { PrismaClient } from '@prisma/client';
import { socket } from '../../server';

export default (prisma: PrismaClient) => {
  socket.on('connection', async (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('test', () => {
      socket.emit(`clientTest`, 'Hello from server');
    });

    socket.on('getAccount', async (data) => {
      // const where: Record<string, string> = {};
      // where['token'] = data.token;
      // const accountDetails = await prisma.user.findFirst({
      //   where,
      // });

      // if (!accountDetails) {
      //   await prisma.user.create({
      //     data: {
      //       token: data.token,
      //       email: 'test@test',
      //       name: 'test',
      //     },
      //   });
      // }

      socket.emit(`setAccount`, { account: 'Feature disabled' });
    });
  });
};
