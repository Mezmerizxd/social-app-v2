import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import User from '../../../features/user';
import Utils from '../../../utils';

type RequestBody = {
    userId: number;
    type: string;
};

export default new (class HandleFriendRequest {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] HandleFriendRequest Started');
        const body: RequestBody = req.body;

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        try {
            if (!body.userId) {
                Responder(res, 'error', null, 'User ID is required.');
                return;
            }
            if (!body.type) {
                Responder(res, 'error', null, 'A type is required.');
                return;
            }

            const friend = new User(body.userId, 'userId');
            await friend.init();
            if (!friend) {
                Responder(res, 'error', null, 'User does not exist.');
                return;
            }

            // Check if their already friends
            if (
                user.isFriendsWith(friend.data()) &&
                friend.isFriendsWith(user.data())
            ) {
                Responder(res, 'error', null, 'You are already friends.');
                return;
            }

            // Get sent & received friend requests
            const userSent: any = [];
            const userReceived: any = [];
            const friendSent: any = [];
            const friendReceived: any = [];

            user.data()?.friendRequests?.sent?.map((user) => {
                userSent.push(user.userId);
            });
            user.data()?.friendRequests?.received?.map((user) => {
                userReceived.push(user.userId);
            });
            friend.data()?.friendRequests?.sent?.map((user) => {
                friendSent.push(user.userId);
            });
            friend.data()?.friendRequests?.received?.map((user) => {
                friendReceived.push(user.userId);
            });

            switch (body.type.toUpperCase()) {
                case 'ACCEPT':
                    const userFriends: any = [];
                    const friendFriends: any = [];

                    user.data()?.friends?.map((user) => {
                        userFriends.push(user.userId);
                    });
                    friend.data()?.friends?.map((user) => {
                        friendFriends.push(user.userId);
                    });

                    userFriends.push(friend.data().userId);
                    friendFriends.push(user.data().userId);

                    // Remove request from friendRequest.received on both accounts
                    Utils.removeItemFromArray(userSent, friend.data().userId);
                    Utils.removeItemFromArray(
                        userReceived,
                        friend.data().userId
                    );
                    Utils.removeItemFromArray(friendSent, user.data().userId);
                    Utils.removeItemFromArray(
                        friendReceived,
                        user.data().userId
                    );

                    // Set user data
                    await user.setSentFriendRequests(userSent);
                    await user.setReceivedFriendRequests(userReceived);
                    await friend.setSentFriendRequests(friendSent);
                    await friend.setReceivedFriendRequests(friendReceived);

                    // Add user to friend friendslist
                    await user.setFriends(userFriends);

                    // Add friend to user friendslist
                    await friend.setFriends(friendFriends);
                    break;

                case 'DECLINE':
                    // Remove request from friendRequest.received on both accounts
                    Utils.removeItemFromArray(userSent, friend.data().userId);
                    Utils.removeItemFromArray(
                        userReceived,
                        friend.data().userId
                    );
                    Utils.removeItemFromArray(friendSent, user.data().userId);
                    Utils.removeItemFromArray(
                        friendReceived,
                        user.data().userId
                    );

                    // Set user data
                    await user.setSentFriendRequests(userSent);
                    await user.setReceivedFriendRequests(userReceived);

                    // Set friend data
                    await friend.setSentFriendRequests(friendSent);
                    await friend.setReceivedFriendRequests(friendReceived);

                    break;

                default:
                    Responder(res, 'error', null, 'Invalid type.');
                    return;
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
