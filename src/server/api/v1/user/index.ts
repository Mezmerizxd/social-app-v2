import { Router } from 'express';

import Login from './login';
import Signup from './signup';

const r = Router();

r.get('/login', Login.perform);
r.post('/signup', Signup.perform);

export default r;
