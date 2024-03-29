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

// function type_test_post<T extends keyof Server.API.API>(
//   version: express.Router,
//   url: T,
//   callback: (
//     headers: express.Request['headers'],
//     params: Parameters<Server.API.API[T]> | null,
//   ) =>
//     | (ReturnType<Server.API.API[T]> & Server.API.ReturnBase)
//     | Promise<ReturnType<Server.API.API[T]> & Server.API.ReturnBase>,
// ): void {
//   version.post(url, async (req, res) => {
//     const bdy: Server.API.API[T] = req.body;
//     const result = bdy !== null ? await callback(req.headers, bdy) : await callback(req.headers, null);

//     res.json(result);
//   });
// }

export default { POST, GET };
