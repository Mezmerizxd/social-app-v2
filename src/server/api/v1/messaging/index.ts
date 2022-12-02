import { Router } from 'express';

import GetMessages from './getMessages';
import DeleteMessage from './deleteMessage';
import EditMessage from './editMessage';

const r = Router();

r.post('/get-messages', GetMessages.perform);
r.post('/delete-message', DeleteMessage.perform);
r.post('/edit-message', EditMessage.perform);

export default r;
