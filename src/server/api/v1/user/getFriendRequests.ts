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

            const usersIdSent: any = [];
            if (userData?.friendRequests?.sent) {
                Object.keys(userData.friendRequests.sent).forEach(
                    async (request) => {
                        usersIdSent.push(userData.friendRequests.sent[request]);
                    }
                );
            }

            const usersIdReceived: any = [];
            if (userData?.friendRequests?.received) {
                Object.keys(userData.friendRequests.received).forEach(
                    async (request) => {
                        usersIdReceived.push(
                            userData.friendRequests.received[request]
                        );
                    }
                );
            }

            const sentRequests: any = [];
            const receivedRequests: any = [];

            for (let i = 0; i < usersIdSent.length; i++) {
                const userId = usersIdSent[i];
                const data = await Features.getUserData('userid', userId);
                sentRequests.push({
                    userId: data.userId,
                    avatar: data.avatar
                        ? data.avatar
                        : 'https://i.pravatar.cc/300',
                    username: data.username,
                });
            }
            for (let i = 0; i < usersIdReceived.length; i++) {
                const userId = usersIdReceived[i];
                const data = await Features.getUserData('userid', userId);
                receivedRequests.push({
                    userId: data.userId,
                    avatar: data.avatar
                        ? data.avatar
                        : 'https://i.pravatar.cc/300',
                    username: data.username,
                });
            }

            // Return data
            Responder(res, 'success', {
                sent: sentRequests,
                received: receivedRequests,
            });
        } catch (error) {
            Responder(res, 'catch', null, `[User] GetFriendRequests, ${error}`);
        }
        Log.debugApi('[V1] [User] GetFriendRequests Finished');
    };
})();
