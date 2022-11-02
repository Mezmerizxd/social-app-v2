import { Router } from 'express';

import Demo from './demo';

const r = Router();

r.post('/demo', Demo.Perform);

export default r;
