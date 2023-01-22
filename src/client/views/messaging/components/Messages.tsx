import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import Socket from '../../../classes/Socket';
import { TimeAgo } from '../../../lib/util';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
    addMessage,
    setSelectedMessage,
    toggleDeleteMessagePopup,
    toggleEditMessagePopup,
    toggleSidebar,
} from '../reducer';
import LoadingDefault from '../../../styled/components/loading/Default';
import {
    MessagesContainer,
    MessagesTitlebar,
    MessagesInput,
    MessagesMessages,
    MessagesMessagesNoMessages,
    MessagesMessagesMessage,
    MessagesMessagesMessageAvatar,
    MessagesMessagesMessageContent,
    MessagesMessagesMessageContentDetails,
} from './styled';

export default ({ mobileMode }: Client.Messaging.Messages) => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const state = useAppSelector((state) => state.messaging);
    const dispatch = useAppDispatch();

    useEffect(() => {
        document.getElementById('autoscroll').scrollIntoView(false);
    }, [state.messages]);

    useEffect(() => {
        const socket = Socket.New();
        socket.on(
            `handleReceiveFriendMessage_${state.selectedFriend.messagesGroupId}`,
            (data) => {
                dispatch(addMessage(data));
            }
        );
        setSocket(socket);
        return () => {
            socket.close();
        };
    }, []);

    const handleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleSend = () => {
        if (message && message !== '') {
            socket.emit('handleSendFriendMessage', {
                authorization: localStorage.getItem('authorization'),
                userId: state.selectedFriend.userId,
                content: message,
            });
        }
        setMessage('');
    };

    return (
        <MessagesContainer
            style={
                mobileMode
                    ? state.sidebar.open
                        ? { width: '0' }
                        : { width: '100%' }
                    : state.sidebar.open
                    ? { width: 'calc(100% - 300px)' }
                    : { width: '100%' }
            }
        >
            <MessagesTitlebar>
                {state.sidebar.open ? (
                    <ArrowBackIcon
                        onClick={handleSidebar}
                        style={
                            mobileMode
                                ? state.sidebar.open
                                    ? { right: '2vw' }
                                    : {}
                                : {}
                        }
                    />
                ) : (
                    <ArrowForwardIcon onClick={handleSidebar} />
                )}
                <h1>{state.selectedFriend.username}</h1>
            </MessagesTitlebar>
            <MessagesMessages>
                <LoadingDefault
                    isLoading={!state.messages.length ? false : isLoading}
                    name="messaging"
                    style={{ width: 'calc(100% - 20px)' }}
                />
                {!state.messages && (
                    <MessagesMessagesNoMessages>
                        <h1>No messages found</h1>
                    </MessagesMessagesNoMessages>
                )}
                {state.messages &&
                    state.messages.length > 0 &&
                    state.messages.map((message, i) => (
                        <MessagesMessagesMessage
                            key={message.messageId}
                            style={
                                message.userId === state.user.userId
                                    ? { background: 'rgba(255, 54, 245, 0.2)' }
                                    : { background: 'rgba(200, 200, 200, 0.2)' }
                            }
                            onLoad={() => {
                                if (i + 1 === state.messages.length) {
                                    setIsLoading(false);
                                }
                            }}
                            onMouseEnter={() =>
                                dispatch(
                                    setSelectedMessage({
                                        isHovering: true,
                                        messageId: message.messageId,
                                        content: message.content,
                                    })
                                )
                            }
                            onMouseLeave={() =>
                                dispatch(
                                    setSelectedMessage({
                                        isHovering: false,
                                    })
                                )
                            }
                        >
                            <MessagesMessagesMessageAvatar>
                                <img
                                    src={message.avatar}
                                    alt={message.avatar}
                                />
                            </MessagesMessagesMessageAvatar>
                            <MessagesMessagesMessageContent>
                                <MessagesMessagesMessageContentDetails>
                                    <p id="username">{message.username}</p>
                                    <p id="date">
                                        {TimeAgo(JSON.parse(message.dateSent))}
                                    </p>
                                    {state.selectedMessage.isHovering &&
                                        message.userId === state.user.userId &&
                                        state.selectedMessage.messageId ===
                                            message.messageId && (
                                            <>
                                                <DeleteIcon
                                                    id="option"
                                                    onClick={() =>
                                                        dispatch(
                                                            toggleDeleteMessagePopup()
                                                        )
                                                    }
                                                />
                                                <EditIcon
                                                    id="option"
                                                    onClick={() =>
                                                        dispatch(
                                                            toggleEditMessagePopup()
                                                        )
                                                    }
                                                />
                                            </>
                                        )}
                                </MessagesMessagesMessageContentDetails>
                                <p id="message">{message.content}</p>
                            </MessagesMessagesMessageContent>
                        </MessagesMessagesMessage>
                    ))}
                <div id="autoscroll"></div>
            </MessagesMessages>
            <MessagesInput>
                <input
                    id="message_input"
                    key="message_input"
                    type="text"
                    placeholder="Type message here"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    value={message}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                />
            </MessagesInput>
        </MessagesContainer>
    );
};
