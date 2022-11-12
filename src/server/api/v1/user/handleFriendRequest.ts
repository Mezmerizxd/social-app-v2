import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';

type RequestBody = {
    userId: number;
};

export default new (class HandleFriendRequest {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] HandleFriendRequest Started');
        const body: RequestBody = req.body;

        if (
            (await (
                await Features.authorize(res, req.headers.authorization)
            ).authorized) === false
        )
            return;

        try {
            // Return data
            Responder(res, 'success', {});
        } catch (error) {
            Responder(
                res,
                'catch',
                null,
                `[User] HandleFriendRequest, ${error}`
            );
        }
        Log.debugApi('[V1] [User] HandleFriendRequest Finished');
    };
})();
