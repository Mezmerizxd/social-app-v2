import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Cfg from '../../../cfg';
import User from '../features/user';

type RequestBody = {
    username: string;
};

export default new (class SendFriendRequest {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] SendFriendRequest Started');
        const body: RequestBody = req.body;

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        try {
            if (body.username === user.data().username) {
                Responder(
                    res,
                    'error',
                    null,
                    'You cannot send a request to yourself.'
                );
                return;
            }
            if (!body.username) {
                Responder(res, 'error', null, 'A username is required.');
                return;
            }
            if (body.username.length < Cfg.UserApi().minUsernameLength) {
                Responder(
                    res,
                    'error',
                    null,
                    `The username must be longer than ${
                        Cfg.UserApi().minUsernameLength
                    } characters.`
                );
                return;
            }

            const receiver = new User(body.username, 'username');
            await receiver.init();

            // Check if user exists
            if (!receiver.data()) {
                Responder(res, 'error', null, 'User does not exist.');
                return;
            }

            if (user.isFriendsWith(receiver.data())) {
                Responder(res, 'error', null, 'You are already friends.');
                return;
            }

            // Check if user has sent a request
            if (
                user.hasUserSentFriendRequest(receiver.data()) &&
                receiver.hasUserReceivedFriendRequest(user.data())
            ) {
                Responder(
                    res,
                    'error',
                    null,
                    'You have already sent a request.'
                );
                return;
            }

            const sent: any = [];
            const received: any = [];

            sent.push(receiver.data().userId);
            user.data()?.friendRequests?.sent?.map((user) => {
                sent.push(user.userId);
            });

            received.push(user.data().userId);
            receiver.data()?.friendRequests?.received?.map((user) => {
                received.push(user.userId);
            });

            await user.setSentFriendRequests(sent);
            await receiver.setReceivedFriendRequests(received);

            // Return data
            Responder(res, 'success', null);
        } catch (error) {
            Responder(res, 'catch', null, `[User] SendFriendRequest, ${error}`);
        }
        Log.debugApi('[V1] [User] SendFriendRequest Finished');
    };
})();
