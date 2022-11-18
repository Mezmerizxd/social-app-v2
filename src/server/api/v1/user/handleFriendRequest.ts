import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';
import Firebase from '../../../data/firebase';
import Cfg from '../../../cfg';

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

            const userFriends: any = [];
            const userRequestsReceived: any = [];
            const userRequestsSent: any = [];
            if (userData?.friends) {
                Object.keys(userData.friends).forEach(async (friend) => {
                    userFriends.push(userData.friends[friend]);
                });
                Object.keys(userData.friendRequests?.received).forEach(
                    async (request) => {
                        userRequestsReceived.push(
                            userData.friendRequests?.received[request]
                        );
                    }
                );
                Object.keys(userData.friendRequests?.sent).forEach(
                    async (request) => {
                        userRequestsSent.push(
                            userData.friendRequests?.sent[request]
                        );
                    }
                );
            }

            const friendFriends: any = [];
            const friendRequestsSent: any = [];
            const friendRequestsReceived: any = [];
            if (friendData?.friends) {
                Object.keys(friendData.friends).forEach(async (friend) => {
                    friendFriends.push(friendData.friends[friend]);
                });
                Object.keys(friendData.friendRequests?.sent).forEach(
                    async (request) => {
                        friendRequestsSent.push(
                            friendData.friendRequests?.sent[request]
                        );
                    }
                );
                Object.keys(friendData.friendRequests?.received).forEach(
                    async (request) => {
                        friendRequestsReceived.push(
                            friendData.friendRequests?.received[request]
                        );
                    }
                );
            }

            switch (body.type.toUpperCase()) {
                case 'ACCEPT':
                    // if user does not have userId in friends continue
                    if (userFriends.includes(friendData.userId)) {
                        Responder(
                            res,
                            'error',
                            null,
                            'You are already friends.'
                        );
                        return;
                    }
                    // if friend does not have user userId in friends continue
                    if (friendFriends.includes(userData.userId)) {
                        Responder(
                            res,
                            'error',
                            null,
                            'You are already friends.'
                        );
                        return;
                    }

                    userFriends.push(friendData.userId);
                    friendFriends.push(userData.userId);

                    // Remove from received
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${userData.userId}/friendRequests/received`
                        )
                        .set(
                            userRequestsReceived.filter(
                                (request) => request === friendData.userId
                            )
                        );
                    // Remove from sent
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${friendData.userId}/friendRequests/sent`
                        )
                        .set(
                            friendRequestsSent.filter(
                                (request) => request === userData.userId
                            )
                        );
                    // Add friend to user
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${userData.userId}/friends`
                        )
                        .set(userFriends);
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${friendData.userId}/friends`
                        )
                        .set(friendFriends);
                    break;

                case 'DECLINE':
                    friendRequestsReceived.filter(
                        (request) => request === userData.userId
                    );
                    friendRequestsSent.filter(
                        (request) => request === userData.userId
                    );
                    userRequestsSent.filter(
                        (request) => request === friendData.userId
                    );
                    userRequestsReceived.filter(
                        (request) => request === friendData.userId
                    );
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${friendData.userId}/friendRequests/sent`
                        )
                        .set(friendRequestsSent);
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${friendData.userId}/friendRequests/received`
                        )
                        .set(friendRequestsReceived);

                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${userData.userId}/friendRequests/sent`
                        )
                        .set(userRequestsSent);
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${userData.userId}/friendRequests/received`
                        )
                        .set(userRequestsReceived);
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
