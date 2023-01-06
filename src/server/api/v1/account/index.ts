import { Router } from 'express';

import VerifyEmail from './VerifyEmail';

const r = Router();

r.post('/verify-email', VerifyEmail.perform);

export default r;
