import * as express from 'express';

function POST<T extends keyof Server.API.API>(
  version: express.Router,
  url: T,
  callback: (
    req: express.Request,
    res: express.Response,
  ) =>
    | (ReturnType<Server.API.API[T]> & Server.API.ReturnBase)
    | Promise<ReturnType<Server.API.API[T]> & Server.API.ReturnBase>,
): void {
  version.post(url, async (req, res) => {
    const result = await callback(req, res);
    res.json(result);
  });
}

function GET<T extends keyof Server.API.API>(
  version: express.Router,
  url: T,
  callback: (
    req: express.Request,
    res: express.Response,
  ) =>
    | (ReturnType<Server.API.API[T]> & Server.API.ReturnBase)
    | Promise<ReturnType<Server.API.API[T]> & Server.API.ReturnBase>,
): void {
  version.post(url, async (req, res) => {
    const result = await callback(req, res);
    res.json(result);
  });
}

export default { POST, GET };
