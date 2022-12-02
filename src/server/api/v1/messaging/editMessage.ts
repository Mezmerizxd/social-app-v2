import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Features from '../features';
import Cfg from '../../../cfg';
import Firebase from '../../../data/firebase';

type RequestBody = {
    messageId: any;
    messagesGroupId: any;
    content: any;
};

export default new (class EditMessage {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [Messaging] EditMessage Started');
        const body: RequestBody = req.body;

        if (
            (await (
                await Features.authorize(res, req.headers.authorization)
            ).authorized) === false
        )
            return;

        try {
            if (!body.messageId) {
                Responder(res, 'error', null, 'Invalid message id.');
                return;
            }
            if (!body.messagesGroupId) {
                Responder(res, 'error', null, 'Invalid message group id.');
                return;
            }
            if (!body.content) {
                Responder(res, 'error', null, 'No content found.');
                return;
            }

            const userData: any = await Features.getUserData(
                'authorization',
                req.headers.authorization
            );

            const users: any = [];
            const fbMessageGroupRef: any = await (
                await Firebase.database
                    .ref(
                        `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbMessages}/${
                            body.messagesGroupId
                        }`
                    )
                    .get()
            ).toJSON();

            if (fbMessageGroupRef) {
                Object.keys(fbMessageGroupRef).forEach((child) => {
                    users.push(child);
                });
            } else {
                Responder(res, 'error', null, 'Failed to find message group.');
                return;
            }

            if (users.includes(userData.userId)) {
                Responder(
                    res,
                    'error',
                    null,
                    'You cannot delete this message.'
                );
                return;
            }

            const messages: any = [];
            const fbMessagesRef = Firebase.database
                .ref(Cfg.Local().fbDbName)
                .child(Cfg.Local().fbDbMessages)
                .orderByChild('messagesGroupId')
                .equalTo(body.messagesGroupId)
                .limitToFirst(1);
            let fbMessages: any = null;
            (await fbMessagesRef.get()).forEach((child) => {
                fbMessages = child.toJSON();
                if (fbMessages?.messages) {
                    Object.keys(fbMessages.messages).forEach((message: any) => {
                        if (
                            fbMessages.messages[message].messageId ===
                                body.messageId &&
                            fbMessages.messages[message].userId ===
                                userData.userId
                        ) {
                            fbMessages.messages[message].content = body.content;
                        }
                        messages.push(fbMessages.messages[message]);
                    });
                }
            });

            await Firebase.database
                .ref(
                    `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbMessages}/${
                        body.messagesGroupId
                    }/messages`
                )
                .set(messages);

            // Return data
            Responder(res, 'success', {});
        } catch (error) {
            Responder(res, 'catch', null, `[Messaging] EditMessage, ${error}`);
        }
        Log.debugApi('[V1] [Messaging] EditMessage Finished');
    };
})();
