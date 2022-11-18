import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';

type RequestBody = {};

export default new (class GetFriendRequests {
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

            const requests = await Features.getFriendRequests(userData.userId);
            if (requests.error) {
                Responder(res, 'error', null, 'No friend requests.');
                return;
            }

            // Return data
            Responder(res, 'success', {
                sent: requests.sent,
                received: requests.received,
            });
        } catch (error) {
            Responder(res, 'catch', null, `[User] GetFriendRequests, ${error}`);
        }
        Log.debugApi('[V1] [User] GetFriendRequests Finished');
    };
})();
