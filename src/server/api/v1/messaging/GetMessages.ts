import { Request, Response } from 'express';
import Responder from '../responder';
import Log from '../../../utils/Log';
import Firebase from '../../../data/firebase';
import Cfg from '../../../cfg';
import User from '../features/user';

export default new (class GetMessages {
    public perform = async (req: Request, res: Response) => {
        Log.debugApi('[V1] [Messaging] GetMessages Started');
        const body: Server.V1.Messaging.Req.GetMessages = req.body;

        const user = new User(req.headers.authorization, 'authorization');
        await user.init();
        if (!(await user.authorize(res))) {
            return;
        }

        try {
            if (!body.userId) {
                Responder(res, 'error', null, 'A user id is required.');
                return;
            }

            const friend = new User(body.userId, 'userId');
            await friend.init();
            if (!(await friend.authorize(res))) {
                Responder(res, 'error', null, 'Friend does not exist.');
                return;
            }

            if (body.userId === user.data().userId) {
                Responder(
                    res,
                    'error',
                    null,
                    'User id must not be your own user id.'
                );
                return;
            }

            const messagesGroupId = friend.data().userId + user.data().userId;
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
                        users: [user.data().userId, friend.data().userId],
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
