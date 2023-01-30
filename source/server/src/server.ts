import * as express from 'express';
import { Server, Socket } from 'socket.io';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';

const api: express.Application = express();
const http = require('http').Server(api);
const socketIo = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});
const v1 = express.Router();

api.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

api.use(cors());
api.use(bodyParser.json());

api.use(
  bodyParser.json({
    limit: '50mb',
  }),
);
api.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
  }),
);

api.use(express.static(path.join(__dirname, `../../minimal-client`)));
api.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, `../../minimal-client/index.html`));
});

export default { api, http, v1 };

export const socket = socketIo.of('/socket').use((socket: Socket, next: (err?: Error) => void) => {
  socket.onAny((...args: any[]) => console.log(socket.nsp.name, socket.id, args));
  next();
});
