import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import Features from '../features';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks';
import {
    setMessages,
    toggleAddFriendPopup,
    toggleFriendRequestsPopup,
    toggleSettingsPopup,
    toggleSidebar,
} from '../reducer';

export default function Sidebar({ mobileMode }: Client.Messaging.Sidebar) {
    const state = useAppSelector((state) => state.messaging);
    const dispatch = useAppDispatch();

    const handleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleFriend = async (userId: any, username: any) => {
        const messages = await Features.getMessages(userId);
        if (messages) {
            dispatch(
                setMessages({
                    messages: messages.messages,
                    userId: userId,
                    username: username,
                    messagesGroupId: messages.messagingGroupId,
                })
            );
            if (mobileMode) {
                handleSidebar();
            }
        }
    };

    return (
        <div
            className="Messaging-sidebar-container"
            style={
                mobileMode
                    ? state.sidebar.open
                        ? { width: '100%' }
                        : { width: '0' }
                    : state.sidebar.open
                    ? { width: '300px' }
                    : { width: '0' }
            }
        >
            <div className="Messaging-sidebar-title">
                <AddIcon
                    id="add"
                    onClick={() => dispatch(toggleAddFriendPopup())}
                />
                <h1>Friends</h1>
                {state.sidebar.open === true &&
                    mobileMode &&
                    state.selectedFriend !== null && (
                        <ArrowBackIcon
                            onClick={handleSidebar}
                            id="arrow"
                            style={
                                mobileMode
                                    ? state.sidebar.open
                                        ? { right: '2vw' }
                                        : {}
                                    : {}
                            }
                        />
                    )}
            </div>
            <div className="Messaging-sidebar">
                <div className="Messaging-sidebar-friendslist">
                    {!state.friends && (
                        <div className="no-friends">
                            <h1>No friends found</h1>
                        </div>
                    )}
                    {state.friends &&
                        state.friends.map((friend) => (
                            <div
                                className="friend"
                                id={friend.userId}
                                key={friend.userId}
                                onClick={() =>
                                    handleFriend(friend.userId, friend.username)
                                }
                                style={
                                    friend?.userId ===
                                    state?.selectedFriend?.userId
                                        ? {
                                              background:
                                                  'rgba(35, 35, 35, 0.6)',
                                          }
                                        : {
                                              background:
                                                  'rgba(35, 35, 35, 0.4)',
                                          }
                                }
                            >
                                <img src={friend.avatar} alt={friend.avatar} />
                                <p>{friend.username}</p>
                            </div>
                        ))}
                </div>
                <div className="Messaging-sidebar-actionbar">
                    <HomeIcon onClick={() => (window.location.href = '/')} />
                    <SettingsIcon
                        onClick={() => dispatch(toggleSettingsPopup())}
                    />
                    <PeopleIcon
                        onClick={() => dispatch(toggleFriendRequestsPopup())}
                    />
                    <p>{state?.user?.username}</p>
                </div>
            </div>
        </div>
    );
}
