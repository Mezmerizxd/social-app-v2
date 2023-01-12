import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import './styles.scss';
import Sidebar from './sidebar';
import Messaging from './messaging';
import AddFriend from './addFriend';
import DeleteMessage from './deleteMessage';
import FriendRequests from './friendRequests';
import EditMessage from './editMessage';
import Settings from './settings';
import Features from './features';
import { setUserData, setFriends, setError } from './reducer';
import Api from '../../classes/Api';

export default function Application() {
    const [mobileMode, setMobileMode] = useState(false);

    const state = useAppSelector((state) => state.application);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('authorization') !== null) {
            setTimeout(async () => {
                const response = await Api.Post({
                    api: '/user/get-user-data',
                    body: {
                        method: 'authorization',
                        key: localStorage.getItem('authorization'),
                    },
                });
                if (response && response.success === true) {
                    dispatch(setUserData(response.data));
                    dispatch(setFriends(await Features.getFriends()));
                } else {
                    dispatch(setError(response.error));
                }
            });
        } else {
            window.location.href = '/authentication';
        }
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

            {state.error !== null ? (
                <div className="Application-error">
                    <h1>There was an error!</h1>
                    <p>{state.error}</p>
                </div>
            ) : (
                <div className="Application">
                    {/* {state.sidebar.open === true && ( */}
                    <Sidebar mobileMode={mobileMode} />
                    {/* )} */}

                    {state.selectedFriend.messagesGroupId !== null && (
                        <Messaging mobileMode={mobileMode} />
                    )}
                </div>
            )}

            {/* Popups */}
            {state.addFriendPopup.open && <AddFriend />}
            {state.friendRequestsPopup.open && <FriendRequests />}
            {state.settingsPopup.open && <Settings />}
            {state.deleteMessagePopup.open && <DeleteMessage />}
            {state.editMessagePopup.open && <EditMessage />}
        </div>
    );
}
