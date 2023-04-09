import * as http from 'http';
import * as sckio from 'socket.io';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as os from 'os-utils';
import * as crypto from 'crypto';
import { logSocket } from '../helpers/logger';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import { blue } from 'colors';

class Statistics {
  protected static instance: Statistics;

  static getInstance(): Statistics {
    if (!Statistics.instance) {
      Statistics.instance = new Statistics();
    }
    return Statistics.instance;
  }

  _port: number = 5000;
  _http: http.Server;
  express: express.Application;
  _io: sckio.Server;
  socket: sckio.Namespace<Server.Statistics.Socket.ClientToServer & Server.Statistics.Socket.ServerToClient>;
  prisma: PrismaClient;

  accessToken: string = crypto.randomBytes(64).toString('hex');

  resourcesRuntime: NodeJS.Timeout;
  accessTokenRuntime: NodeJS.Timeout;

  _resourcesUpdateInterval: number = 1000;
  _accessTokenUpdateInterval: number = 1000 * 60 * 60 * 24;

  _connectedSockets: number = 0;

  platform: string = 'none';
  process_uptime: number = 0;
  uptime: number = 0;
  cpu_usage: number = 0;
  cpu_count: number = 0;
  cpu_free: number = 0;
  mem_usage: number = 0;
  mem_total: number = 0;
  mem_free: number = 0;

  constructor() {
    this.express = express();
    this._http = require('http').Server(this.express);
    this._io = new sckio.Server(this._http, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    });
    this.socket = this._io.of('/socket').use((socket: sckio.Socket, next: (err?: Error) => void) => {
      logSocket(socket);
      next();
    });
  }

  start(prisma: PrismaClient) {
    this.prisma = prisma;

    this.updateSystemResources();
    this.updateAccessToken();

    this.middlewares();
    this.renderer();

    this.connect();

    this._http.listen(this._port, () => {
      console.log(blue(`Statistics address http://localhost:${this._port}`));
    });
  }

  stop() {
    clearInterval(this.resourcesRuntime);
    clearInterval(this.accessTokenRuntime);

    this._io.close();
    this._http.close();
    console.log(blue('Statistics stopped'));
  }

  updateAccessToken() {
    this.accessTokenRuntime = setInterval(() => {
      this.accessToken = crypto.randomBytes(64).toString('hex');
    }, this._accessTokenUpdateInterval);
  }

  middlewares() {
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
    this.express.use(express.static(path.join(__dirname, `../../../server/public`)));
    this.express.get('/', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, `../../../server/public/statistics.html`));
    });
  }

  connect() {
    this.socket.on('connection', (s) => {
      if (!s.handshake.query.accessToken) {
        s.disconnect();
      } else if (s.handshake.query.accessToken !== this.accessToken) {
        s.disconnect();
      }

      this._connectedSockets++;

      s.on('systemResources', () => {
        setInterval(
          () =>
            s.emit('systemResources', {
              platform: this.platform,
              process_uptime: this.process_uptime,
              uptime: this.uptime,
              cpu_usage: this.cpu_usage,
              cpu_count: this.cpu_count,
              cpu_free: this.cpu_free,
              mem_usage: this.mem_usage,
              mem_total: this.mem_total,
              mem_free: this.mem_free,
            }),
          this._resourcesUpdateInterval,
        );
      });

      s.on('disconnect', () => {
        this._connectedSockets--;
        s.disconnect();
      });
    });
  }

  updateSystemResources() {
    this.resourcesRuntime = setInterval(() => {
      if (this._connectedSockets > 0) {
        os.cpuUsage((usage: number) => {
          this.cpu_usage = Math.round(usage * 100);
        });
        this.cpu_count = os.cpuCount();
        os.cpuFree((free: number) => {
          this.cpu_free = Math.round(free * 100);
        });

        this.mem_total = Math.round(os.totalmem());
        this.mem_free = Math.round(os.freemem());
        this.mem_usage = Math.round(os.totalmem() - os.freemem());
        this.platform = os.platform();
        this.process_uptime = Math.round(os.processUptime());
        this.uptime = Math.round(os.sysUptime());
      }
    }, this._resourcesUpdateInterval);
  }
}

export const statistics = Statistics.getInstance();
