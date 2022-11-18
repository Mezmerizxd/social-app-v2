import SendIcon from '@mui/icons-material/Send';
import MailIcon from '@mui/icons-material/Mail';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FriendRequestsPrpos } from './types';
import Features from './features';

import './styles.scss';
import { useState, useEffect } from 'react';
import { CustomButton } from './styles';
import Api from '../../classes/Api';

export default function FriendRequests({
    state,
    dispatch,
}: FriendRequestsPrpos) {
    const [context, setContext] = useState<string>('sent');

    useEffect(() => {
        setTimeout(async () => {
            const response = await Features.getFriendRequests();
            dispatch({
                type: 'SET_FRIEND_REQUESTS_DATA',
                data: {
                    sent: response.sent,
                    received: response.received,
                },
            });
        });
    }, []);

    const close = () => {
        dispatch({
            type: 'SET_FRIEND_REQUESTS',
            data: {
                open: false,
            },
        });
    };

    const accept = async (id: any) => {
        const response = await Api.Post(
            '/user/handle-friend-request',
            {
                type: 'accept',
                userId: id,
            },
            true
        );
        if (!response?.error) {
            dispatch({
                type: 'FRIEND_REQUESTS_REMOVE',
                data: {
                    userId: id,
                },
            });
        }
    };
    const decline = async (id: any) => {
        const response = await Api.Post(
            '/user/handle-friend-request',
            {
                type: 'decline',
                userId: id,
            },
            true
        );
        if (!response?.error) {
            dispatch({
                type: 'FRIEND_REQUESTS_REMOVE',
                data: {
                    userId: id,
                },
            });
        }
    };

    return (
        <div className="Popup-container" onClick={close}>
            <div className="Popup-basic" onClick={(e) => e.stopPropagation()}>
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
                            state.friendRequests.sent.length > 0 ? (
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
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="Popup-basic-friendRequests-notfound">
                                    <p>No Request Sent</p>
                                </div>
                            )}
                        </>
                    )}

                    {context === 'received' && (
                        <>
                            {state.friendRequests.received &&
                            state.friendRequests.received.length > 0 ? (
                                state.friendRequests.received.map((request) => (
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
                                ))
                            ) : (
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
    );
}
