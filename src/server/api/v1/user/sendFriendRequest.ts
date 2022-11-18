import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';
import Cfg from '../../../cfg';
import Firebase from '../../../data/firebase';

type RequestBody = {
    username: string;
};

export default new (class SendFriendRequest {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [User] SendFriendRequest Started');
        const body: RequestBody = req.body;

        if (
            (await (
                await Features.authorize(res, req.headers.authorization)
            ).authorized) === false
        )
            return;

        try {
            if (!body.username) {
                Responder(res, 'error', null, 'A username is required.');
                return;
            }
            if (body.username.length < Cfg.UserApi().minUsernameLength) {
                Responder(
                    res,
                    'error',
                    null,
                    `The username must be longer than ${
                        Cfg.UserApi().minUsernameLength
                    } characters.`
                );
                return;
            }

            // Make sure user exists
            const fbFriendUserDataRef = Firebase.database
                .ref(Cfg.Local().fbDbName)
                .child(Cfg.Local().fbDbUserData)
                .orderByChild('username')
                .equalTo(body.username)
                .limitToFirst(1);
            let fbFriendUserData: any = null;
            await (
                await fbFriendUserDataRef.get()
            ).forEach((child) => {
                fbFriendUserData = child.toJSON();
            });
            if (!fbFriendUserData) {
                Responder(res, 'error', null, 'User does not exist.');
                return;
            }

            const userData: any = await Features.getUserData(
                'authorization',
                req.headers.authorization
            );

            // Check if already friends
            const userFriends: any = [];
            if (userData?.friends) {
                Object.keys(userData.friends).forEach(async (friend) => {
                    userFriends.push(userData.friends[friend]);
                });
            }
            const friendFriends: any = [];
            if (fbFriendUserData?.friends) {
                Object.keys(fbFriendUserData.friends).forEach(
                    async (friend) => {
                        friendFriends.push(fbFriendUserData.friends[friend]);
                    }
                );
            }

            if (userFriends.includes(fbFriendUserData.userId)) {
                Responder(res, 'error', null, 'You are already friends.');
                return;
            }
            if (friendFriends.includes(userData.userId)) {
                Responder(res, 'error', null, 'You are already friends.');
                return;
            }

            // Get friends friend requests
            let alreadyReceived = false;
            const friendReceived: any = [];
            if (fbFriendUserData?.friendRequests?.received) {
                Object.keys(fbFriendUserData.friendRequests.received).forEach(
                    (request) => {
                        if (
                            fbFriendUserData.friendRequests.received[
                                request
                            ] === userData.userId
                        ) {
                            alreadyReceived = true;
                        }
                        friendReceived.push(
                            fbFriendUserData.friendRequests.received[request]
                        );
                    }
                );
            }

            // Get users frind requests
            let alreadySent = false;
            const usersSent: any = [];
            if (userData?.friendRequests?.sent) {
                Object.keys(userData.friendRequests.sent).forEach((request) => {
                    if (
                        userData.friendRequests.sent[request] ===
                        fbFriendUserData.userId
                    ) {
                        alreadySent = true;
                    }
                    usersSent.push(userData.friendRequests.sent[request]);
                });
            }

            if (alreadyReceived && alreadySent) {
                Responder(res, 'error', null, 'Friend Request already sent.');
                return;
            }

            // Send requests
            usersSent.push(fbFriendUserData.userId);
            friendReceived.push(userData.userId);

            await Firebase.database
                .ref(
                    `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbUserData}/${
                        userData.userId
                    }/friendRequests/sent`
                )
                .set(usersSent);
            await Firebase.database
                .ref(
                    `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbUserData}/${
                        fbFriendUserData.userId
                    }/friendRequests/received`
                )
                .set(friendReceived);

            // Return data
            Responder(res, 'success', null);
        } catch (error) {
            Responder(res, 'catch', null, `[User] SendFriendRequest, ${error}`);
        }
        Log.debugApi('[V1] [User] SendFriendRequest Finished');
    };
})();
