import { Router } from 'express';

import GetMessages from './getMessages';

const r = Router();

r.post('/get-messages', GetMessages.perform);

export default r;
