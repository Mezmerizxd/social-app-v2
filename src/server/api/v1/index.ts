import { Router } from 'express';

import tests from './tests';
import user from './user';
import account from './account';
import messaging from './messaging';

const r = Router();

r.use('/tests', tests);
r.use('/user', user);
r.use('/account', account);
r.use('/messaging', messaging);

export default r;
