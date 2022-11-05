import { Router } from 'express';

import tests from './tests';
import user from './user';

const r = Router();

r.use('/tests', tests);
r.use('/user', user);

export default r;
