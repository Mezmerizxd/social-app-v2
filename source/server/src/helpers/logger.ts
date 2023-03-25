import * as express from 'express';
import { blue, green, yellow, gray } from 'colors';
import { inspect } from 'util';
import { Socket } from 'socket.io';

export const log = (...args: any[]) => {
  console.log(...args.map((arg) => (typeof arg === 'string' ? arg : inspect(arg, { depth: 4, colors: true }))));
};

export function logAPI(req: express.Request, res: express.Response) {
  log(yellow('[API]'), green(`${req.method} ${req.url}`));
}

export function logSocket(socket: Socket) {
  socket.onAny((...args: any[]) => log(yellow('[SOCKET]'), green(socket.nsp.name), blue(socket.id), ...args));
}

export function logManager(...args: any[]) {
  log(gray('[MANAGER]'), ...args);
}

export function logController(...args: any[]) {
  log(yellow('[CONTROLLER]'), ...args);
}
