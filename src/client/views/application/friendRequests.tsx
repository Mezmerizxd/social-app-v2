import SendIcon from '@mui/icons-material/Send';
import MailIcon from '@mui/icons-material/Mail';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { InitialDataProps } from './reducer';

import './styles.scss';
import { useState } from 'react';
import { CustomButton } from './styles';

interface FriendRequestsPrpos {
    state: InitialDataProps;
    dispatch: React.Dispatch<any>;
}

export default function FriendRequests({
    state,
    dispatch,
}: FriendRequestsPrpos) {
    const [context, setContext] = useState<string>('sent');

    const close = () => {
        dispatch({
            type: 'SET_FRIEND_REQUESTS',
            data: {
                open: false,
            },
        });
    };

    const accept = (id: any) => {
        dispatch({
            type: 'FRIEND_REQUESTS_REMOVE',
            data: {
                userId: id,
            },
        });
    };
    const decline = (id: any) => {
        dispatch({
            type: 'FRIEND_REQUESTS_REMOVE',
            data: {
                userId: id,
            },
        });
    };

    return (
        state.friendRequests.open && (
            <div className="Popup-container" onClick={close}>
                <div
                    className="Popup-basic"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="Popup-basic-title">
                        <h1>Friend Requests</h1>
                    </div>

                    <div className="Popup-basic-tabbar">
                        <div
                            className="Popup-basic-tab"
                            id={context === 'sent' ? 'tab_selected' : ''}
                            onClick={() => setContext('sent')}
                        >
                            <SendIcon />
                        </div>
                        <div
                            className="Popup-basic-tab"
                            id={context === 'received' ? 'tab_selected' : ''}
                            onClick={() => setContext('received')}
                        >
                            <MailIcon />
                        </div>
                    </div>

                    <div className="Popup-basic-friendRequests">
                        {context === 'sent' && (
                            <>
                                {state.friendRequests.sent &&
                                    state.friendRequests.sent.length > 0 &&
                                    state.friendRequests.sent.map((request) => (
                                        <div
                                            className="Popup-basic-friendRequests-request"
                                            key={request.userId}
                                        >
                                            <img src={request.avatar} alt="" />
                                            <p>{request.username}</p>
                                            <div className="Popup-basic-friendRequests-request-actions">
                                                <CancelIcon
                                                    id="decline"
                                                    onClick={() =>
                                                        decline(request.userId)
                                                    }
                                                />
                                                <CheckCircleIcon
                                                    id="accept"
                                                    onClick={() =>
                                                        accept(request.userId)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                {!state.friendRequests.sent && (
                                    <div className="Popup-basic-friendRequests-notfound">
                                        <p>No Request Sent</p>
                                    </div>
                                )}
                            </>
                        )}

                        {context === 'received' && (
                            <>
                                {state.friendRequests.received &&
                                    state.friendRequests.received.length > 0 &&
                                    state.friendRequests.received.map(
                                        (request) => (
                                            <div
                                                className="Popup-basic-friendRequests-request"
                                                key={request.userId}
                                            >
                                                <img
                                                    src={request.avatar}
                                                    alt=""
                                                />
                                                <p>{request.username}</p>
                                                <div className="Popup-basic-friendRequests-request-actions">
                                                    <CancelIcon
                                                        id="decline"
                                                        onClick={() =>
                                                            decline(
                                                                request.userId
                                                            )
                                                        }
                                                    />
                                                    <CheckCircleIcon
                                                        id="accept"
                                                        onClick={() =>
                                                            accept(
                                                                request.userId
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                {!state.friendRequests.received && (
                                    <div className="Popup-basic-friendRequests-notfound">
                                        <p>No Request Received</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="Popup-basic-action-center">
                        <CustomButton id="close" onClick={close}>
                            Close
                        </CustomButton>
                    </div>
                </div>
            </div>
        )
    );
}
