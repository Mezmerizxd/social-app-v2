import server from '../server';
import handler from '../helpers/handler';

export default (): void => {
  handler.POST(server.v1, '/get-socket-details', (req, res) => {
    return {
      socketUrl: process.env.SERVER_SOCKET_CONNECTION,
      success: true,
    };
  });
};
