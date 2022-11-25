import Log from '../../utils/Log';
import Firebase from '../../data/firebase';
import * as crypto from 'crypto';
import { Response } from 'express';
import Responder from './responder';
import Cfg from '../../cfg';

type GenerateReturn = {
    data: any;
};

type UserDataReturn = {
    userId?: number;
    username?: string;
    email?: string;
    authorization?: string;
    friends?: [];
    friendRequests?: {
        sent: [];
        received: [];
    };
    avatar?: string;
    error?: boolean;
};

type AuthorizeReturn = {
    data?: {
        userId: any;
        username: any;
        email: any;
        authorization: any;
    };
    authorized: boolean;
};

type GetFriendRequestsReturn = {
    sent?: [];
    received?: [];
    error?: any;
};

export default new (class Features {
    private generators_max_id_size = 999999999999999;
    private generators_max_token_byte = 64;
    private generators_max_attempts = 5;

    public generateUserId = async (): Promise<GenerateReturn> => {
        Log.debug('[API] [V1] [Features] GenerateUserId - started');
        let created = false;
        let id: number = 0;
        let attempts = 0;
        try {
            while (!created) {
                id = Math.floor(Math.random() * this.generators_max_id_size);
                if (attempts === this.generators_max_attempts) {
                    Log.error('[API] [V1] [Features] UserId - max attempts');
                    return { data: null };
                }
                const fbUserAccount = Firebase.database.ref(
                    `${Cfg.Local().fbDbName}/${
                        Cfg.Local().fbDbUserAcccount
                    }/${id}`
                );
                const fbUserDataResp = (await fbUserAccount.get()).toJSON();
                if (!fbUserDataResp) created = true;
                attempts += 1;
            }
        } catch (error) {
            Log.error('[API] [V1] [Features] GenerateUserId,', error);
        }
        Log.debug('[API] [V1] [Features] GenerateUserId - finished');
        return { data: id };
    };

    public generateAuthorization = async (): Promise<GenerateReturn> => {
        Log.debug('[API] [V1] [Features] GenerateAuthorization - started');
        let created = false;
        let token: string = '';
        let attempts = 0;
        try {
            while (!created) {
                token = crypto
                    .randomBytes(this.generators_max_token_byte)
                    .toString('hex');
                if (attempts === this.generators_max_attempts) {
                    Log.error(
                        '[API] [V1] [Features] AuthorizationToken - max attempts'
                    );
                    return { data: null };
                }
                const fbUserData = Firebase.database
                    .ref(`${Cfg.Local().fbDbName}/`)
                    .child(Cfg.Local().fbDbUserData)
                    .orderByChild('authorization')
                    .equalTo(token)
                    .limitToFirst(1);
                const fbUserDataResp = (await fbUserData.get()).toJSON();
                if (!fbUserDataResp) created = true;
                attempts += 1;
            }
        } catch (error) {
            Log.error('[API] [V1] [Features] GenerateAuthorization,', error);
        }
        Log.debug('[API] [V1] [Features] GenerateAuthorization - finished');
        return { data: token };
    };

    public generateMessageId = async (): Promise<GenerateReturn> => {
        Log.debug('[API] [V1] [Features] GenerateMessageId - started');
        let created = false;
        let id: number = 0;
        let attempts = 0;
        try {
            while (!created) {
                id = Math.floor(Math.random() * this.generators_max_id_size);
                if (attempts === this.generators_max_attempts) {
                    Log.error('[API] [V1] [Features] MessageId - max attempts');
                    return { data: null };
                }
                const fbMessages = Firebase.database
                    .ref(`${Cfg.Local().fbDbName}/`)
                    .child(Cfg.Local().fbDbMessages)
                    .child('messages')
                    .orderByChild('messageId')
                    .equalTo(id)
                    .limitToFirst(1);
                const fbUserDataResp = (await fbMessages.get()).toJSON();
                if (!fbUserDataResp) created = true;
                attempts += 1;
            }
        } catch (error) {
            Log.error('[API] [V1] [Features] GenerateMessageId,', error);
        }
        Log.debug('[API] [V1] [Features] GenerateMessageId - finished');
        return { data: id };
    };

    public getUserData = async (
        method: string,
        key: any
    ): Promise<UserDataReturn> => {
        method = method.toUpperCase();
        let fbUserData: any = null;
        switch (method) {
            case 'AUTHORIZATION':
                fbUserData = Firebase.database
                    .ref(`${Cfg.Local().fbDbName}/`)
                    .child(Cfg.Local().fbDbUserData)
                    .orderByChild('authorization')
                    .equalTo(key)
                    .limitToFirst(1);
                break;
            case 'USERID':
                fbUserData = Firebase.database
                    .ref(`${Cfg.Local().fbDbName}/`)
                    .child(Cfg.Local().fbDbUserData)
                    .orderByChild('userId')
                    .equalTo(key)
                    .limitToFirst(1);
                break;
        }
        let fbUserDataResp: any = null;
        (await fbUserData.get()).forEach((child) => {
            fbUserDataResp = child.toJSON();
        });
        if (!fbUserDataResp) {
            return {
                error: true,
            };
        }

        return {
            userId: fbUserDataResp.userId,
            username: fbUserDataResp.username,
            authorization: fbUserDataResp.authorization,
            email: fbUserDataResp.email,
            friends: fbUserDataResp.friends,
            friendRequests: fbUserDataResp.friendRequests,
            avatar: fbUserDataResp.avatar,
        };
    };

    public authorize = async (
        res: Response,
        authorization: any
    ): Promise<AuthorizeReturn> => {
        if (!authorization) {
            if (res) {
                Responder(
                    res,
                    'error',
                    null,
                    'No authorization token was passed.'
                );
            }
            return {
                authorized: false,
            };
        }
        const userData = await this.getUserData('authorization', authorization);
        if (userData.error === true) {
            Responder(res, 'error', null, 'You are not authorized.');
            return {
                authorized: false,
            };
        }
        return {
            authorized: true,
            data: {
                userId: userData.userId,
                username: userData.username,
                email: userData.email,
                authorization: userData.authorization,
            },
        };
    };

    public getFriendRequests = async (
        userId: any
    ): Promise<GetFriendRequestsReturn> => {
        if (!userId) {
            return {
                error: 'No user id',
            };
        }

        try {
            const userData: any = await this.getUserData('userid', userId);
            if (userData?.error) {
                return {
                    error: "Couldn't find user with user id " + userId,
                };
            }

            const usersIdSent: any = [];
            const usersIdReceived: any = [];
            if (userData?.friendRequests?.sent) {
                Object.keys(userData.friendRequests.sent).forEach(
                    async (request) => {
                        usersIdSent.push(userData.friendRequests.sent[request]);
                    }
                );
            }
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
                const data = await this.getUserData('userid', userId);
                if (!data.error) {
                    sentRequests.push({
                        userId: data.userId,
                        avatar: data.avatar
                            ? data.avatar
                            : 'https://i.pravatar.cc/300',
                        username: data.username,
                    });
                } else {
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${userData.userId}/friendRequests/sent`
                        )
                        .set(
                            usersIdSent.filter(
                                (request) => request === data.userId
                            )
                        );
                }
            }
            for (let i = 0; i < usersIdReceived.length; i++) {
                const userId = usersIdReceived[i];
                const data = await this.getUserData('userid', userId);
                if (!data.error) {
                    receivedRequests.push({
                        userId: data.userId,
                        avatar: data.avatar
                            ? data.avatar
                            : 'https://i.pravatar.cc/300',
                        username: data.username,
                    });
                } else {
                    await Firebase.database
                        .ref(
                            `${Cfg.Local().fbDbName}/${
                                Cfg.Local().fbDbUserData
                            }/${userData.userId}/friendRequests/received`
                        )
                        .set(
                            usersIdReceived.filter(
                                (request) => request === data.userId
                            )
                        );
                }
            }

            return {
                sent: sentRequests,
                received: receivedRequests,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    };

    public changeUsername = async (
        userId: number,
        username: string
    ): Promise<boolean> => {
        const fbUserDataRef = Firebase.database
            .ref(Cfg.Local().fbDbName)
            .child(Cfg.Local().fbDbUserData)
            .orderByChild('username')
            .equalTo(username)
            .limitToFirst(1);
        const fbUserData = await fbUserDataRef.get();

        // If user data exists return error
        if (fbUserData.toJSON()) {
            return false;
        } else {
            await Firebase.database
                .ref(
                    `${Cfg.Local().fbDbName}/${
                        Cfg.Local().fbDbUserData
                    }/${userId}/username`
                )
                .set(username);
        }
        return true;
    };
})();
