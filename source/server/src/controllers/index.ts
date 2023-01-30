import server from '../server';

export default () => {
  server.v1.post('/get-socket-details', (req, res) => {
    res.json({
      socketUrl: process.env.SERVER_SOCKET_CONNECTION,
    });
  });
};
