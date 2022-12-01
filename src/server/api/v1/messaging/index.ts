import { Router } from 'express';

import GetMessages from './getMessages';
import DeleteMessage from './deleteMessage';

const r = Router();

r.post('/get-messages', GetMessages.perform);
r.post('/delete-message', DeleteMessage.perform);

export default r;
