import * as socketio from 'socket.io';
import Log from '../../../utils/Log';
import Features from '../features';
import Firebase from '../../../data/firebase';
import Cfg from '../../../cfg';

type SendFriendMessageType = {
    authorization: any;
    userId: any;
    content: any;
};

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

    private SendFriendMessage = async (data: SendFriendMessageType) => {
        Log.debug('[IO/V1] [Messaging] SendFriendMessage Started');

        if (data?.content === null || data?.content === '') {
            return;
        }

        try {
            const userData: any = await Features.getUserData(
                'authorization',
                data.authorization
            );

            const fbMessagesGroupRef = Firebase.database.ref(
                `${Cfg.Local().fbDbName}/${Cfg.Local().fbDbMessages}/${
                    data.userId + userData.userId
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
                    userId: userData.userId,
                    username: userData.username,
                    dateSent: JSON.stringify(new Date()),
                    content: data.content,
                    avatar: userData.avatar
                        ? userData.avatar
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
                            data.userId + userData.userId
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
