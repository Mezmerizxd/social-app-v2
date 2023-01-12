import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import Socket from '../../classes/Socket';
import Utils from '../../classes/Utils';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
    addMessage,
    setSelectedMessage,
    toggleDeleteMessagePopup,
    toggleEditMessagePopup,
    toggleSidebar,
} from './reducer';
import LoadingDefault from '../../components/loading/default';

export default function Messaging({
    mobileMode,
}: Client.Application.Messaging) {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const state = useAppSelector((state) => state.application);
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
        <div
            className="Application-messaging-container"
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
            <div className="Application-messaging-titlebar">
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
            </div>
            <div className="Application-messaging-messages">
                <LoadingDefault
                    isLoading={!state.messages.length ? false : isLoading}
                    name="messaging"
                    style={{ width: 'calc(100% - 20px)' }}
                />
                {!state.messages && (
                    <div className="no-messages">
                        <h1>No messages found</h1>
                    </div>
                )}
                {state.messages &&
                    state.messages.length > 0 &&
                    state.messages.map((message, i) => (
                        <div
                            className="message"
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
                            <div className="message-avatar">
                                <img
                                    src={message.avatar}
                                    alt={message.avatar}
                                />
                            </div>
                            <div className="message-content">
                                <div className="message-content-details">
                                    <p id="username">{message.username}</p>
                                    <p id="date">
                                        {Utils.TimeAgo(
                                            JSON.parse(message.dateSent)
                                        )}
                                    </p>
                                    {state.selectedMessage.isHovering &&
                                        message.userId === state.user.userId &&
                                        state.selectedMessage.messageId ===
                                            message.messageId && (
                                            <div>
                                                <DeleteIcon
                                                    className="option"
                                                    onClick={() =>
                                                        dispatch(
                                                            toggleDeleteMessagePopup()
                                                        )
                                                    }
                                                />
                                                {/* <ReplyIcon
                                                    className="option"
                                                    onClick={() =>
                                                        handleReply()
                                                    }
                                                /> */}
                                                <EditIcon
                                                    className="option"
                                                    onClick={() =>
                                                        dispatch(
                                                            toggleEditMessagePopup()
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                </div>
                                <p id="message">{message.content}</p>
                            </div>
                        </div>
                    ))}
                <div id="autoscroll"></div>
            </div>
            <div className="Application-messaging-input">
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
            </div>
        </div>
    );
}
