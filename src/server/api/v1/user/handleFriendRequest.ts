import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';

type RequestBody = {
    userId: number;
    type: string;
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
            if (!body.userId) {
                Responder(res, 'error', null, 'User ID is required.');
                return;
            }
            if (!body.type) {
                Responder(res, 'error', null, 'A type is required.');
                return;
            }
            if (
                body.type.toUpperCase() !== 'ACCEPT' ||
                body.type.toUpperCase() !== 'DECLINE'
            ) {
                Responder(res, 'error', null, 'Invalid type.');
                return;
            }

            const userData: any = await Features.getUserData(
                'authorization',
                req.headers.authorization
            );
            const friendData: any = await Features.getUserData(
                'userid',
                body.userId
            );

            if (friendData?.errror) {
                Responder(res, 'error', null, 'User does not exist.');
                return;
            }

            switch (body.type) {
                case 'ACCEPT':
                    break;

                case 'DECLINE':
                    break;
            }

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
