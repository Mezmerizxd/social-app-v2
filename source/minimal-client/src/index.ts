import Main from './renderer';
import {io} from 'socket.io-client';
import {getSocketDetails} from '@lib/client/client';

const waitForSocket = (socket: any) => {
  return new Promise<void>((resolve) => {
    const check = () => {
      if (socket.id) {
        return resolve();
      }
      setTimeout(check, 100);
    };
    check();
  });
};

setTimeout(async () => {
  const { socketUrl } = await getSocketDetails();
  const socket = io(socketUrl);

  socket.on('connect_error', async (e) => {
    console.log('socket error', e);
  });

  socket.on('connect', () => {
    console.log('connected');
  });

  socket.connect();

  await waitForSocket(socket);

  Main(socket);
});
