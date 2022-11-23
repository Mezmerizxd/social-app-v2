import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { MessagingProps } from './types';
import Socket from '../../classes/Socket';
import Utils from '../../classes/Utils';

import './styles.scss';

export default function Messaging({
    state,
    dispatch,
    mobileMode,
}: MessagingProps) {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        document.getElementById('autoscroll').scrollIntoView(false);
    }, [state.messages]);

    useEffect(() => {
        const socket = Socket.New();
        socket.on(
            `handleReceiveFriendMessage_${state.selectedFriend.messagesGroupId}`,
            (data) => {
                console.log(data);
                dispatch({
                    type: 'ADD_MESSAGE',
                    data: data,
                });
            }
        );
        setSocket(socket);
        return () => {
            socket.close();
        };
    }, []);

    const handleSidebar = () => {
        dispatch({
            type: 'SET_SIDEBAR_OPEN',
            data: {
                open: !state.sidebar.open,
            },
        });
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
                {!state.messages && (
                    <div className="no-messages">
                        <h1>No messages found</h1>
                    </div>
                )}
                {state.messages &&
                    state.messages.length > 0 &&
                    state.messages.map((message) => (
                        <div
                            className="message"
                            key={message.messageId}
                            style={
                                message.userId === state.settings.userId
                                    ? { background: 'rgba(255, 54, 245, 0.2)' }
                                    : { background: 'rgba(200, 200, 200, 0.2)' }
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
