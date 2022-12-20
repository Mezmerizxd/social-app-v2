import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import User from '../features/user';

export default new (class GetFriendRequests {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] GetFriendRequests Started');

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        try {
            if (!user.data().friendRequests) {
                Responder(res, 'error', null, 'No friend requests.');
                return;
            }
            // Return data
            Responder(res, 'success', {
                sent: user.data().friendRequests.sent,
                received: user.data().friendRequests.received,
            });
        } catch (error) {
            Responder(res, 'catch', null, `[User] GetFriendRequests, ${error}`);
        }
        Log.debugApi('[V1] [User] GetFriendRequests Finished');
    };
})();
