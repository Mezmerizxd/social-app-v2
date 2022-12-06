import Firebase from '../data/firebase';
import Cfg from '../cfg';
import Log from '../utils/Log';
import { ProcessedUserData, PublicUserData, DatabaseReturn } from './types';
import { Response } from 'express';
import Responder from '../api/v1/responder';

export default class User {
    private key: any;
    private method: string;
    private userData: ProcessedUserData;
    public firebaseShortcut: string = `${Cfg.Local().fbDbName}/${
        Cfg.Local().fbDbUserData
    }`;
    private authorized: boolean;

    constructor(key: any, method: string) {
        this.key = key;
        this.method = method;
    }

    public data = (): ProcessedUserData => {
        return this.userData;
    };

    public isFriendsWith = (friend: ProcessedUserData): boolean => {
        let bool = false;
        // User1
        if (
            this.userData?.friends?.find(
                (friend) => friend.userId === friend.userId
            )
        )
            bool = true;

        // User2
        if (
            friend?.friends?.find(
                (friend) => friend.userId === this.userData.userId
            )
        )
            bool = true;

        return bool;
    };

    public hasUserSentFriendRequest = (toUser: ProcessedUserData): boolean => {
        if (
            this.userData?.friendRequests?.sent?.find(
                (request) => request.userId === toUser.userId
            )
        ) {
            return true;
        } else {
            return false;
        }
    };

    public hasUserReceivedFriendRequest = (
        fromUser: ProcessedUserData
    ): boolean => {
        if (
            this.userData?.friendRequests?.received?.find(
                (request) => request.userId === fromUser.userId
            )
        ) {
            return true;
        } else {
            return false;
        }
    };

    public setAvatarUrl = async (url: string): Promise<void> => {
        await Firebase.database
            .ref(`${this.firebaseShortcut}/${this.userData.userId}/avatar`)
            .set(url);
    };

    public setUsername = async (username: string): Promise<DatabaseReturn> => {
        const user = await this.getUser(username, 'username');
        if (user) {
            return {
                success: false,
                error: 'Username already taken',
            };
        }
        await Firebase.database
            .ref(`${this.firebaseShortcut}/${this.userData.userId}/username`)
            .set(username);
        return {
            success: true,
        };
    };

    public setSentFriendRequests = async (
        requests: number[]
    ): Promise<void> => {
        await Firebase.database
            .ref(
                `${this.firebaseShortcut}/${this.userData.userId}/friendRequests/sent`
            )
            .set(requests);
    };

    public setReceivedFriendRequests = async (
        requests: number[]
    ): Promise<void> => {
        await Firebase.database
            .ref(
                `${this.firebaseShortcut}/${this.userData.userId}/friendRequests/received`
            )
            .set(requests);
    };

    public setFriends = async (friends: number[]): Promise<void> => {
        await Firebase.database
            .ref(`${this.firebaseShortcut}/${this.userData.userId}/friends`)
            .set(friends);
    };

    public init = async (): Promise<void> => {
        if (this.key !== null) {
            const data = await this.getUser(this.key, this.method);
            if (data) {
                this.userData = data;
                this.authorized = true;
            }
        }
    };

    public authorize = async (response: Response): Promise<boolean> => {
        if (!this.key) {
            if (response) {
                Responder(
                    response,
                    'error',
                    null,
                    'No authorization token was passed.'
                );
            }
            return false;
        }
        if (this.authorized === false) {
            Responder(response, 'error', null, 'You are not authorized.');
            return false;
        }
        return true;
    };

    public getUser = async (
        key: any,
        method: string
    ): Promise<ProcessedUserData> => {
        let fbResData: any = null;
        try {
            const fbUserDataRef = Firebase.database
                .ref(`${Cfg.Local().fbDbName}/`)
                .child(Cfg.Local().fbDbUserData)
                .orderByChild(method)
                .equalTo(key)
                .limitToFirst(1);
            (await fbUserDataRef.get()).forEach((child: any) => {
                fbResData = child.toJSON();
            });
            // Handle and get friends details friends
            if (fbResData?.friends) {
                let ids: any = [];
                Object.keys(fbResData.friends).forEach(async (friend) => {
                    ids.push(fbResData.friends[friend]);
                });
                const friends: any = [];
                for (let i = 0; i < ids.length; i++) {
                    const userId = ids[i];
                    const ref: any = (
                        await Firebase.database
                            .ref(
                                `${Cfg.Local().fbDbName}/${
                                    Cfg.Local().fbDbUserData
                                }/${userId}`
                            )
                            .get()
                    ).toJSON();

                    friends.push({
                        userId: ref.userId,
                        avatar: ref.avatar
                            ? ref.avatar
                            : 'https://i.pravatar.cc/300',
                        username: ref.username,
                    });
                }
                fbResData.friends = friends;
            }
            // Handle and get friend requests
            if (fbResData?.friendRequests) {
                // Sent requests
                if (fbResData.friendRequests?.sent) {
                    let ids: any = [];
                    Object.keys(fbResData.friendRequests.sent).forEach(
                        async (request) => {
                            ids.push(fbResData.friendRequests.sent[request]);
                        }
                    );
                    const requests: any = [];
                    for (let i = 0; i < ids.length; i++) {
                        const userId = ids[i];
                        const ref: any = (
                            await Firebase.database
                                .ref(
                                    `${Cfg.Local().fbDbName}/${
                                        Cfg.Local().fbDbUserData
                                    }/${userId}`
                                )
                                .get()
                        ).toJSON();

                        requests.push({
                            userId: ref.userId,
                            avatar: ref.avatar
                                ? ref.avatar
                                : 'https://i.pravatar.cc/300',
                            username: ref.username,
                        });
                    }
                    fbResData.friendRequests.sent = requests;
                }
                // Received requests
                if (fbResData.friendRequests?.received) {
                    let ids: any = [];
                    Object.keys(fbResData.friendRequests.received).forEach(
                        async (request) => {
                            ids.push(
                                fbResData.friendRequests.received[request]
                            );
                        }
                    );
                    const requests: any = [];
                    for (let i = 0; i < ids.length; i++) {
                        const userId = ids[i];
                        const ref: any = (
                            await Firebase.database
                                .ref(
                                    `${Cfg.Local().fbDbName}/${
                                        Cfg.Local().fbDbUserData
                                    }/${userId}`
                                )
                                .get()
                        ).toJSON();

                        requests.push({
                            userId: ref.userId,
                            avatar: ref.avatar
                                ? ref.avatar
                                : 'https://i.pravatar.cc/300',
                            username: ref.username,
                        });
                    }
                    fbResData.friendRequests.received = requests;
                }
            }
        } catch (error) {
            Log.error(`[Features] [User] getUser error, ${error}`);
        }
        return fbResData;
    };
}
