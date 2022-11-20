import { Router } from 'express';

import tests from './tests';
import user from './user';
import messaging from './messaging';

const r = Router();

r.use('/tests', tests);
r.use('/user', user);
r.use('/messaging', messaging);

export default r;
