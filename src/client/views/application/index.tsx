import { useEffect, useReducer, useState } from 'react';

import { InitialData, Reducer } from './reducer';
import './styles.scss';

import Sidebar from './sidebar';
import Messaging from './messaging';
import AddFriend from './addFriend';
import FriendRequests from './friendRequests';
import Settings from './settings';
import Features from './features';

export default function Application() {
    const [mobileMode, setMobileMode] = useState(false);
    const [state, dispatch] = useReducer(Reducer, InitialData);

    useEffect(() => {
        setTimeout(async () => {
            Features.setDebugMode(true);
            const friends = await Features.getFriends();
            const userData: any = await Features.getUserData();

            dispatch({
                type: 'SET_FRIENDS',
                data: {
                    friends: friends,
                },
            });
            dispatch({
                type: 'SET_SETTINGS_DATA',
                data: {
                    username: userData?.username,
                    userId: userData?.userId,
                    email: userData?.email,
                    avatar: userData?.avatar,
                },
            });
        });
    }, []);

    useEffect(() => {
        if (screen.width < 600) {
            setMobileMode(true);
        } else {
            setMobileMode(false);
        }
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
