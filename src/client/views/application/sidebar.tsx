import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SidebarProps } from './types';
import Features from './features';

import './styles.scss';

export default function Sidebar({ state, mobileMode, dispatch }: SidebarProps) {
    const handleSidebar = () => {
        dispatch({
            type: 'SET_SIDEBAR_OPEN',
            data: {
                open: !state.sidebar.open,
            },
        });
    };

    const handleFriend = async (userId: any, username: any) => {
        const messages = await Features.getMessages(userId);
        if (messages) {
            dispatch({
                type: 'SET_MESSAGES',
                data: {
                    messages: messages,
                    userId: userId,
                    username: username,
                },
            });
        }
    };

    return (
        <div
            className="Application-sidebar-container"
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
            <div className="Application-sidebar-title">
                <AddIcon
                    id="add"
                    onClick={() =>
                        dispatch({
                            type: 'SET_ADDFRIEND',
                            data: {
                                open: true,
                            },
                        })
                    }
                />
                <h1>Friends</h1>
                {mobileMode && (
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
            <div className="Application-sidebar">
                <div className="Application-sidebar-friendslist">
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
                            >
                                <img src={friend.avatar} alt={friend.avatar} />
                                <p>{friend.username}</p>
                            </div>
                        ))}
                </div>
                <div className="Application-sidebar-actionbar">
                    <SettingsIcon
                        onClick={() =>
                            dispatch({
                                type: 'SET_SETTINGS',
                                data: {
                                    open: true,
                                },
                            })
                        }
                    />
                    <PeopleIcon
                        onClick={() =>
                            dispatch({
                                type: 'SET_FRIEND_REQUESTS',
                                data: {
                                    open: true,
                                },
                            })
                        }
                    />
                    <p>{state.settings.username}</p>
                </div>
            </div>
        </div>
    );
}
