import { useEffect, useReducer, useState } from 'react';

import { InitialData, Reducer } from './reducer';
import './styles.scss';

import Sidebar from './sidebar';
import Messaging from './messaging';
import AddFriend from './addFriend';
import FriendRequests from './friendRequests';
import Settings from "./settings";

export default function Application() {
    const [mobileMode, setMobileMode] = useState(false);
    const [state, dispatch] = useReducer(Reducer, InitialData);

    useEffect(() => {
        setTimeout(async () => {
            const friends = [];
            const messages = [];
            const sent = [];
            const received = [];

            for (let i = 0; i < 100; i++) {
                friends.push({
                    userId: i,
                    username: 'Test ' + i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
            for (let i = 0; i < 100; i++) {
                messages.push({
                    messageId: i,
                    userId: i,
                    username: 'user' + i,
                    dateSent: new Date(),
                    content:
                        'messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage' +
                        i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
            for (let i = 0; i < 100; i++) {
                sent.push({
                    userId: i,
                    username: 'Test ' + i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
            for (let i = 0; i < 100; i++) {
                received.push({
                    userId: i,
                    username: 'Test ' + i,
                    avatar: 'https://i.pravatar.cc/300',
                });
            }
            const account = {
                username: "test",
                userId: 10001,
                email: "test@email.com",
                avatar: "https://i.pravatar.cc/300"
            }

            dispatch({
                type: 'SET_FRIENDS',
                data: {
                    friends: friends,
                },
            });
            dispatch({
                type: 'SET_MESSAGES',
                data: {
                    messages: messages,
                },
            });
            dispatch({
                type: 'SET_FRIEND_REQUESTS_DATA',
                data: {
                    sent: sent,
                    received: received,
                },
            });
            dispatch({
                type: 'SET_SETTINGS_DATA',
                data: {
                    username: account.username,
                    userId: account.userId,
                    email: account.email,
                    avatar: account.avatar,
                },
            });
        });
    }, []);

    window.addEventListener('resize', () => {
        if (screen.width < 600) {
            setMobileMode(true);
        } else {
            setMobileMode(false);
        }
    });

    return (
        <div className="Application-container">
            <div className="Application">
                {state.sidebar.open === true && (
                    <Sidebar
                        state={state}
                        dispatch={dispatch}
                        mobileMode={mobileMode}
                    />
                )}

                {state.messages && (
                    <Messaging
                        state={state}
                        dispatch={dispatch}
                        mobileMode={mobileMode}
                    />
                )}
            </div>

            {/* Popups */}
            <AddFriend state={state} dispatch={dispatch} />
            <FriendRequests state={state} dispatch={dispatch} />
            <Settings state={state} dispatch={dispatch} />
        </div>
    );
}
