import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';

type RequestBody = {};

export default new (class GetFriends {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] GetFriends Started');
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

            const friendsIds: any = [];
            if (userData?.friends) {
                Object.keys(userData.friends).forEach(async (friend) => {
                    friendsIds.push(userData.friends[friend]);
                });
            }

            const friends: any = [];
            for (let i = 0; i < friendsIds.length; i++) {
                const userId = friendsIds[i];
                const data = await Features.getUserData('userid', userId);
                if (!data.error) {
                    friends.push({
                        userId: data.userId,
                        avatar: data.avatar
                            ? data.avatar
                            : 'https://i.pravatar.cc/300',
                        username: data.username,
                    });
                }
            }

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
