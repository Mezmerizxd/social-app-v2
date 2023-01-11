import * as socketio from 'socket.io';
import Log from '../../../utils/Log';
import Features from '../generators';
import Firebase from '../../../data/firebase';
import Cfg from '../../../cfg';
import User from '../features/user';

export default class Messaging {
    private io: socketio.Server;
    private socket: socketio.Socket;

    constructor(io: socketio.Server, socket: socketio.Socket) {
        this.socket = socket;
        this.io = io;

        socket.on('handleSendFriendMessage', (data) =>
            this.SendFriendMessage(data)
        );
    }

    private SendFriendMessage = async (
        data: Server.V1.Messaging.IO.SendFriendMessage
    ) => {
        Log.debug('[IO/V1] [Messaging] SendFriendMessage Started');

        if (data?.content === null || data?.content === '') {
            return;
        }

        try {
            const user = new User(data.authorization, 'authorization');
            await user.init();

            const fbMessagesGroupRef = Firebase.database.ref(
                `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbMessages}/${
                    data.userId + user.data().userId
                }`
            );
            let fbMessagesGroup: any = await (
                await fbMessagesGroupRef.get()
            ).toJSON();

            const fbMessages: any = [];
            if (fbMessagesGroup?.messages) {
                Object.keys(fbMessagesGroup.messages).forEach((message) => {
                    fbMessages.push(fbMessagesGroup.messages[message]);
                });
            }

            if (fbMessagesGroup) {
                const messageId = await Features.generateMessageId();

                const newMessage = {
                    messageId: messageId.data,
                    userId: user.data().userId,
                    username: user.data().username,
                    dateSent: JSON.stringify(new Date()),
                    content: data.content,
                    avatar: user.data().avatar
                        ? user.data().avatar
                        : 'https://i.pravatar.cc/300',
                };

                fbMessages.push(newMessage);

                this.io.sockets.emit(
                    `handleReceiveFriendMessage_${fbMessagesGroup.messagesGroupId}`,
                    newMessage
                );

                await Firebase.database
                    .ref(
                        `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbMessages}/${
                            data.userId + user.data().userId
                        }/messages`
                    )
                    .set(fbMessages);
            }
        } catch (error) {
            Log.error('[IO/V1] [Messaging] SendFriendMessage,', error);
        }

        Log.debug('[IO/V1] [Messaging] SendFriendMessage Finished');
    };
}
