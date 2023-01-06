import { Router } from 'express';

import Login from './Login';
import Signup from './Signup';
import GetUserData from './GetUserData';
import SendFriendRequest from './SendFriendRequest';
import HandleFriendRequest from './HandleFriendRequest';
import GetFriendRequests from './GetFriendRequests';
import GetFriends from './GetFriends';
import ChangeUsername from './ChangeUsername';
import ChangeAvatar from './ChangeAvatar';

const r = Router();

r.post('/login', Login.perform);
r.post('/signup', Signup.perform);
r.post('/get-user-data', GetUserData.perform);
r.post('/get-friend-requests', GetFriendRequests.perform);
r.post('/handle-friend-request', HandleFriendRequest.perform);
r.post('/send-friend-request', SendFriendRequest.perform);
r.post('/get-friends', GetFriends.perform);
r.post('/change-username', ChangeUsername.perform);
r.post('/change-avatar', ChangeAvatar.perform);

export default r;
