import Log from '../../utils/Log';
import Firebase from '../../data/firebase';
import * as crypto from 'crypto';
import { Response } from 'express';
import Responder from './responder';

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

export default new (class Features {
    private generators_max_id_size = 999999999999999;
    private generators_max_token_byte = 64;
    private generators_max_attempts = 5;

    public generateUserId = async (): Promise<GenerateReturn> => {
        Log.debug('[API] [V1] [Features] GenerateUserId - started');
        let created = false;
        let id: number = 0;
        let attempts = 0;
        while (!created) {
            id = Math.floor(Math.random() * this.generators_max_id_size);
            if (attempts === this.generators_max_attempts) {
                Log.error('[Generator] UserId - max attempts');
                return { data: null };
            }
            const fbUserAccount = Firebase.database.ref(
                `social_app_v2/user_accounts/${id}`
            );
            const fbUserDataResp = (await fbUserAccount.get()).toJSON();
            if (!fbUserDataResp) created = true;
            attempts += 1;
        }
        Log.debug('[API] [V1] [Features] GenerateUserId - finished');
        return { data: id };
    };

    public generateAuthorization = async (): Promise<GenerateReturn> => {
        Log.debug('[API] [V1] [Features] GenerateAuthorization - started');
        let created = false;
        let token: string = '';
        let attempts = 0;
        while (!created) {
            token = crypto
                .randomBytes(this.generators_max_token_byte)
                .toString('hex');
            if (attempts === this.generators_max_attempts) {
                Log.error('[Generator] AuthorizationToken - max attempts');
                return { data: null };
            }
            const fbUserData = Firebase.database
                .ref(`social_app_v2/`)
                .child('user_data')
                .orderByChild('authorization')
                .equalTo(token)
                .limitToFirst(1);
            const fbUserDataResp = (await fbUserData.get()).toJSON();
            if (!fbUserDataResp) created = true;
            attempts += 1;
        }
        Log.debug('[API] [V1] [Features] GenerateAuthorization - finished');
        return { data: token };
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
                    .ref(`social_app_v2/`)
                    .child('user_data')
                    .orderByChild('authorization')
                    .equalTo(key)
                    .limitToFirst(1);
                break;
            case 'USERID':
                fbUserData = Firebase.database
                    .ref(`social_app_v2/`)
                    .child('user_data')
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

    public combineFriends = async (userId1: any, userId2: any) => {};
})();