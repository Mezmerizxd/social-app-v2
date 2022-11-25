import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import './styles.scss';
import Sidebar from './sidebar';
import Messaging from './messaging';
import AddFriend from './addFriend';
import FriendRequests from './friendRequests';
import Settings from './settings';
import Features from './features';
import { setUserData, setFriends } from './reducer';

export default function Application() {
    const [mobileMode, setMobileMode] = useState(false);

    const state = useAppSelector((state) => state.application);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(async () => {
            dispatch(setFriends(await Features.getFriends()));
            dispatch(setUserData(await Features.getUserData()));
        });
    }, [state.friendRequestsPopup, state.addFriendPopup]);

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
            <title>Social App V2</title>
            <div className="Application">
                {state.sidebar.open === true && (
                    <Sidebar mobileMode={mobileMode} />
                )}

                {state.selectedFriend.messagesGroupId !== null && (
                    <Messaging mobileMode={mobileMode} />
                )}
            </div>

            {/* Popups */}
            {state.addFriendPopup.open && <AddFriend />}
            {state.friendRequestsPopup.open && <FriendRequests />}
            {state.settingsPopup.open && <Settings />}
        </div>
    );
}
