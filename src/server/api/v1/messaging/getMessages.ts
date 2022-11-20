import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';
import Firebase from '../../../data/firebase';
import Cfg from '../../../cfg';

type RequestBody = {
    userId: any;
};

export default new (class GetMessages {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [Messaging] GetMessages Started');
        const body: RequestBody = req.body;

        if (
            (await (
                await Features.authorize(res, req.headers.authorization)
            ).authorized) === false
        )
            return;

        try {
            if (!body.userId) {
                Responder(res, 'error', null, 'A user id is required.');
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
            if (friendData.error) {
                Responder(res, 'error', null, 'User does not exist.');
                return;
            }

            if (body.userId === userData.userId) {
                Responder(
                    res,
                    'error',
                    null,
                    'User id must not be your own user id.'
                );
                return;
            }

            const messagesGroupId = friendData.userId + userData.userId;
            const messages: any = [];

            const fbMessagesRef = Firebase.database
                .ref(Cfg.Local().fbDbName)
                .child(Cfg.Local().fbDbMessages)
                .orderByChild('messagesGroupId')
                .equalTo(messagesGroupId)
                .limitToFirst(1);
            let fbMessages: any = null;
            (await fbMessagesRef.get()).forEach((child) => {
                fbMessages = child.toJSON();
                if (fbMessages?.messages) {
                    Object.keys(fbMessages.messages).forEach((message) => {
                        messages.push(fbMessages.messages[message]);
                    });
                }
            });
            if (!fbMessages) {
                await Firebase.database
                    .ref(
                        `${Cfg.Local().fbDbName}/${
                            Cfg.Local().fbDbMessages
                        }/${messagesGroupId}`
                    )
                    .set({
                        messagesGroupId: messagesGroupId,
                        messages: messages,
                        users: [userData.userId, friendData.userId],
                    });
            }

            // Return data
            Responder(res, 'success', {
                messagingGroupId: messagesGroupId,
                messages: messages,
            });
        } catch (error) {
            Responder(res, 'catch', null, `[Messaging] GetMessages, ${error}`);
        }
        Log.debugApi('[V1] [Messaging] GetMessages Finished');
    };
})();
