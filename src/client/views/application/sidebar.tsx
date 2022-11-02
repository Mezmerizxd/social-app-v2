import AddIcon from '@mui/icons-material/Add';

import './styles.scss';

interface SidebarProps {
    state: any;
    dispatch: React.Dispatch<any>;
    mobileMode: boolean;
}

export default function Sidebar({ state, mobileMode }: SidebarProps) {
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
                <AddIcon />
                <h1>Friends</h1>
            </div>
            <div className="Application-sidebar">
                <div className="Application-sidebar-friendslist">
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
            </div>
        </div>
    );
}
