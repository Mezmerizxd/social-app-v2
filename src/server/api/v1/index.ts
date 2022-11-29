import { Router } from 'express';

import tests from './tests';
import user from './user';
import messaging from './messaging';

import Responder from './responder';
import Cfg from '../../cfg';

const r = Router();

r.post('/info', (req, res) => {
    Responder(res, 'success', Cfg.Node());
});

r.use('/tests', tests);
r.use('/user', user);
r.use('/messaging', messaging);

export default r;
