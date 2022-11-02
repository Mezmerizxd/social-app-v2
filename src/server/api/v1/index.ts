import { Router } from 'express';

import tests from './tests';

const r = Router();

r.use('/tests', tests);

export default r;
