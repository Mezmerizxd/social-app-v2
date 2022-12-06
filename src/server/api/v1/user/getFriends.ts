import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import User from '../../../features/user';

type RequestBody = {};

export default new (class GetFriends {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] GetFriends Started');

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        try {
            const friends = user.data().friends;

            // Return data
            Responder(res, 'success', {
                friends: friends,
            });
        } catch (error) {
            Responder(res, 'catch', null, `[User] GetFriends, ${error}`);
        }
        Log.debugApi('[V1] [User] GetFriends Finished');
    };
})();
