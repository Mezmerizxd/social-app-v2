import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect } from 'react';
import { MessagingProps } from './types';

import './styles.scss';

export default function Messaging({
    state,
    dispatch,
    mobileMode,
}: MessagingProps) {
    useEffect(() => {
        document.getElementById('autoscroll').scrollIntoView(false);
    }, [state.messages]);

    const handleSidebar = () => {
        dispatch({
            type: 'SET_SIDEBAR_OPEN',
            data: {
                open: !state.sidebar.open,
            },
        });
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
                <h1>User</h1>
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
                        <div className="message" key={message.messageId}>
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
                                        {JSON.stringify(message.dateSent)}
                                    </p>
                                </div>
                                <p id="message">{message.content}</p>
                            </div>
                        </div>
                    ))}
                <div id="autoscroll"></div>
            </div>
            <div className="Application-messaging-input">
                <input type="text" placeholder="Type message here" />
            </div>
        </div>
    );
}
