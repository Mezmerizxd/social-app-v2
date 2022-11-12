import { Router } from 'express';

import Login from './login';
import Signup from './signup';
import GetUserData from './getUserData';

const r = Router();

r.post('/login', Login.perform);
r.post('/signup', Signup.perform);
r.post('/get-user-data', GetUserData.perform);

export default r;
