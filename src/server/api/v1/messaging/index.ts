import { Router } from 'express';

import GetMessages from './GetMessages';
import DeleteMessage from './DeleteMessage';
import EditMessage from './EditMessage';

const r = Router();

r.post('/get-messages', GetMessages.perform);
r.post('/delete-message', DeleteMessage.perform);
r.post('/edit-message', EditMessage.perform);

export default r;
