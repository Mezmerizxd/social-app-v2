import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Cfg from '../../../cfg';
import Firebase from '../../../data/firebase';
import User from '../features/user';

export default new (class DeleteMessage {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [Messaging] DeleteMessage Started');
        const body: Server.V1.Messaging.Req.DeleteMessage = req.body;

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        try {
            if (!body.messageId) {
                Responder(res, 'error', null, 'Invalid message id.');
                return;
            }
            if (!body.messagesGroupId) {
                Responder(res, 'error', null, 'Invalid message group id.');
                return;
            }

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

            if (users.includes(user.data().userId)) {
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
                            fbMessages.messages[message].userId ===
                            user.data().userId
                        ) {
                            if (
                                fbMessages.messages[message].messageId !==
                                body.messageId
                            ) {
                                messages.push(fbMessages.messages[message]);
                            }
                        } else {
                            messages.push(fbMessages.messages[message]);
                        }
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
            Responder(
                res,
                'catch',
                null,
                `[Messaging] DeleteMessage, ${error}`
            );
        }
        Log.debugApi('[V1] [Messaging] DeleteMessage Finished');
    };
})();
