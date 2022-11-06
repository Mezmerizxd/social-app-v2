import { Router } from 'express';

import Login from './login';
import Signup from './signup';

const r = Router();

r.post('/login', Login.perform);
r.post('/signup', Signup.perform);

export default r;
