import * as http from 'http';
import * as sckio from 'socket.io';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as os from 'os-utils';
import * as crypto from 'crypto';
import { logSocket } from './helpers/logger';
import { PrismaClient } from '@prisma/client';

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
  socket: sckio.Namespace;
  prisma: PrismaClient;

  accessToken: string;

  _sysResourcesUpdateInterval: number = 1000;
  _accessTokenUpdateInterval: number = 1000 * 60 * 60 * 24;

  full_load_avg: number = 0;
  load_avg: number = 0;
  platform: string = 'none';
  process_uptime: number = 0;
  uptime: number = 0;
  cpu_usage: number = 0;
  cpu_count: number = 0;
  cpu_free: number = 0;
  mem_usage: number = 0;
  mem_total: number = 0;
  mem_free: number = 0;
  hdd: number = 0;

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

    this.updateAccessToken();
    this.updateSystemResources();

    this.middlewares();

    this.connect();

    this._http.listen(this._port, () => {
      console.log('Statistics is running on port', this._port);
    });
  }

  stop() {
    this._http.close();
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

  connect() {
    this.socket.on('connection', (s: sckio.Socket) => {
      if (!s.handshake.query.accessToken) {
        s.disconnect();
      } else if (s.handshake.query.accessToken !== this.accessToken) {
        s.disconnect();
      }

      s.on('getSystemResources', () => {
        setInterval(() => {
          s.emit('getSystemResources', {
            full_load_avg: this.full_load_avg,
            load_avg: this.load_avg,
            platform: this.platform,
            process_uptime: this.process_uptime,
            uptime: this.uptime,
            cpu_usage: this.cpu_usage,
            cpu_count: this.cpu_count,
            cpu_free: this.cpu_free,
            mem_usage: this.mem_usage,
            mem_total: this.mem_total,
            mem_free: this.mem_free,
            hdd: this.hdd,
          });
        }, this._sysResourcesUpdateInterval);
      });

      s.on('disconnect', () => {
        s.disconnect();
      });
    });
  }

  updateSystemResources() {
    setInterval(() => {
      os.cpuUsage((usage: number) => {
        this.cpu_usage = usage;
      });
      this.cpu_count = os.cpuCount();
      os.cpuFree((free: number) => {
        this.cpu_free = free;
      });

      this.mem_total = os.totalmem();
      this.mem_free = os.freemem();
      this.mem_usage = this.mem_total - this.mem_free;

      this.hdd = os.totalmem() - os.freemem();

      this.full_load_avg = os.loadavg(1);
      this.load_avg = os.loadavg(5);
      this.platform = os.platform();
      this.process_uptime = os.processUptime();
      this.uptime = os.sysUptime();
    }, this._sysResourcesUpdateInterval);
  }

  updateAccessToken() {
    this.accessToken = crypto.randomBytes(64).toString('hex');

    setInterval(() => {
      this.accessToken = crypto.randomBytes(64).toString('hex');
    }, this._accessTokenUpdateInterval);
  }
}

export const statistics = Statistics.getInstance();
