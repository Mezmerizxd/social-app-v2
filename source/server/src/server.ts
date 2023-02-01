import * as express from 'express';
import { Namespace, Server, Socket } from 'socket.io';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { logAPI, logSocket } from './helpers/logger';

const api: express.Application = express();
const http = require('http').Server(api);
const socketIo = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const v1 = express.Router();

api.use((req: express.Request, res: express.Response, next) => {
  logAPI(req, res);
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

api.use(express.static(path.join(__dirname, `../../zvyezda/build`)));
api.get('/*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, `../../zvyezda/build/index.html`));
});

export default { api, http, v1 };

export const socket: Namespace<Server.Socket.ClientToServer & Server.Socket.ServerToClient> = socketIo
  .of('/socket')
  .use((socket: Socket, next: (err?: Error) => void) => {
    logSocket(socket);
    next();
  });
