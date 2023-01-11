import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import User from '../features/user';

export default new (class GetUserData {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] GetUserData Started');
        const body: Server.V1.User.Req.GetUserData = req.body;

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        try {
            if (!body.method) {
                Responder(res, 'error', null, 'A method is required.');
                return;
            }

            if (!body.key) {
                Responder(res, 'error', null, 'A key is required.');
                return;
            }

            if (!user.data()) {
                Responder(res, 'error', null, 'No user found.');
                return;
            }

            // Return data, send all the data if the requeter is requesting their own account.
            if (req.headers.authorization === user.data().authorization) {
                Responder(res, 'success', user.data());
            } else {
                Responder(res, 'success', {
                    userId: user.data().userId,
                    username: user.data().username,
                    avatar: user.data().avatar,
                });
            }
        } catch (error) {
            Responder(res, 'catch', null, `[User] GetUserData, ${error}`);
        }
        Log.debugApi('[V1] [User] GetUserData Finished');
    };
})();
