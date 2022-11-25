import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';

type RequestBody = {
    username: string;
};

export default new (class ChangeUsername {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] GetFriendRequests Started');
        const body: RequestBody = req.body;

        if (
            (await (
                await Features.authorize(res, req.headers.authorization)
            ).authorized) === false
        )
            return;

        try {
            const userData: any = await Features.getUserData(
                'authorization',
                req.headers.authorization
            );

            const changeUsername = await Features.changeUsername(
                userData.userId,
                body.username
            );
            if (!changeUsername) {
                Responder(res, 'error', null, 'Username already taken');
                return;
            }

            // Return data
            Responder(res, 'success', {});
        } catch (error) {
            Responder(res, 'catch', null, `[User] ChangeUsername, ${error}`);
        }
        Log.debugApi('[V1] [User] ChangeUsername Finished');
    };
})();
