import server from '../server';
import handler from '../helpers/handler';

export default () => {
  handler.POST(server.v1, '/get-socket-details', (req, res) => {
    res.send({
      socketUrl: process.env.SERVER_SOCKET_CONNECTION,
    });
  });
};
