import { Router } from 'express';

import Login from './login';
import Signup from './signup';
import GetUserData from './getUserData';
import SendFriendRequest from './sendFriendRequest';
import HandleFriendRequest from './handleFriendRequest';
import GetFriendRequests from './getFriendRequests';
import GetFriends from './getFriends';

const r = Router();

r.post('/login', Login.perform);
r.post('/signup', Signup.perform);
r.post('/get-user-data', GetUserData.perform);
r.post('/get-friend-requests', GetFriendRequests.perform);
r.post('/handle-friend-request', HandleFriendRequest.perform);
r.post('/send-friend-request', SendFriendRequest.perform);
r.post('/get-friends', GetFriends.perform);

export default r;
