import * as express from 'express';

function POST<T extends keyof Server.API>(version: express.Router, url: T, callback: express.Handler) {
  version.post(url, callback);
}

function GET<T extends keyof Server.API>(version: express.Router, url: T, callback: express.Handler) {
  version.get(url, callback);
}

export default { POST, GET };
