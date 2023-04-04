import * as http from 'http';
import * as sckio from 'socket.io';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

class Statistics {
  protected static instance: Statistics;

  static getInstance(): Statistics {
    if (!Statistics.instance) {
      Statistics.instance = new Statistics();
    }
    return Statistics.instance;
  }

  _port: number = 5000;
  http: http.Server;
  express: express.Application;
  socket: sckio.Server;

  constructor() {
    this.express = express();
    this.http = require('http').Server(this.express);
    this.socket = new sckio.Server(this.http, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    });
  }

  start() {
    this.middlewares();

    this.http.listen(this._port, () => {
      console.log('listening on *:', this._port);
    });
  }

  stop() {
    this.http.close();
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
}

export const statistics = Statistics.getInstance();
