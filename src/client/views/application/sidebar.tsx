import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { InitialDataProps } from './reducer';

import './styles.scss';

interface SidebarProps {
    state: InitialDataProps;
    dispatch: React.Dispatch<any>;
    mobileMode: boolean;
}

export default function Sidebar({ state, mobileMode, dispatch }: SidebarProps) {
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
                            >
                                <img src={friend.avatar} alt={friend.avatar} />
                                <p>{friend.username}</p>
                            </div>
                        ))}
                </div>
                <div className="Application-sidebar-actionbar">
                    <SettingsIcon />
                    <PeopleIcon />
                </div>
            </div>
        </div>
    );
}
