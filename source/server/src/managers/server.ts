import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as http from 'http';
import * as sckio from 'socket.io';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { logAPI, logSocket } from '../helpers/logger';
import { serverStarted } from '../helpers/emailer';
import { blue } from 'colors';

class Server {
  protected static instance: Server;

  static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  prisma: PrismaClient;
  _port: number;
  _http: http.Server;
  _io: sckio.Server;
  express: express.Application;
  socket: sckio.Namespace<Server.Socket.ClientToServer & Server.Socket.ServerToClient>;

  v1: express.Router;

  constructor() {
    dotenv.config({ path: `${__dirname}/../../../../.env` });
    this.express = express();
    this._http = require('http').Server(this.express);
    this._io = new sckio.Server(this._http, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    });
    this.v1 = express.Router();
    this.socket = this._io.of('/socket').use((socket: sckio.Socket, next: (err?: Error) => void) => {
      logSocket(socket);
      next();
    });
    this._port = Number(process.env.PORT);
  }

  start(prisma: PrismaClient) {
    this.prisma = prisma;

    this.middlewares();
    this.renderer();

    this.express.use('/api/v1', this.v1);

    this._http.listen(this._port, (): void => {
      console.log(blue(`Server address http://localhost:${this._port}`));
      this.alertAdminsServerStarted();
    });
  }

  stop() {
    this._io.close();
    this._http.close();
    console.log(blue('Server stopped'));
  }

  middlewares() {
    this.express.use((req: express.Request, res: express.Response, next) => {
      logAPI(req, res);
      next();
    });
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(
      bodyParser.json({
        limit: '50mb',
      }),
    );
    this.express.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: false,
      }),
    );
  }

  renderer() {
    this.express.use(express.static(path.join(__dirname, `../../../zvyezda/build`)));
    this.express.get('/*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, `../../../zvyezda/build/index.html`));
    });
  }

  async alertAdminsServerStarted() {
    if (process.env.USE_PRODUCTION !== 'true') return;
    try {
      const admins = await this.prisma.accounts.findMany({
        where: {
          admin: true,
        },
      });
      if (!admins) return;

      for (let i = 0; i < admins.length; i++) {
        const admin = admins[i];
        await serverStarted(admin.email);
      }
    } catch (error) {
      console.log('[Server] alertAdminsServerStarted: ', error);
      return;
    }
  }
}

export const server = Server.getInstance();
