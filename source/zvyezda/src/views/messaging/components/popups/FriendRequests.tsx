import SendIcon from '@mui/icons-material/Send';
import MailIcon from '@mui/icons-material/Mail';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Features from '../../features';
import { useEffect, useState } from 'react';
import Button from '../../../../styled/components/buttons/Button';
import Api from '../../../../classes/Api';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { rmFriendRequestsPopupRequest, setFriendRequestsPopupData, toggleFriendRequestsPopup } from '../../reducer';
import {
  Container,
  Popup,
  PopupActionsCenter,
  PopupFriendRequests,
  PopupFriendRequestsNotFound,
  PopupFriendRequestsRequest,
  PopupFriendRequestsRequestActions,
  PopupTabbar,
  PopupTabbarTab,
  PopupTitle,
} from './styled';

export default () => {
  const [context, setContext] = useState<string>('sent');

  const state = useAppSelector((state) => state.messaging);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(async () => {
      const response = await Features.getFriendRequests();
      dispatch(
        setFriendRequestsPopupData({
          sent: response.sent,
          received: response.received,
        }),
      );
    });
  }, []);

  const close = () => {
    dispatch(toggleFriendRequestsPopup());
  };

  const accept = async (id: any) => {
    const response = await Api.Post({
      api: '/user/handle-friend-request',
      body: {
        type: 'accept',
        userId: id,
      },
    });
    if (!response?.error) {
      dispatch(rmFriendRequestsPopupRequest(id));
    }
  };
  const decline = async (id: any) => {
    const response = await Api.Post({
      api: '/user/handle-friend-request',
      body: {
        type: 'decline',
        userId: id,
      },
    });
    if (!response?.error) {
      dispatch(rmFriendRequestsPopupRequest(id));
    }
  };

  return (
    <Container onClick={close}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>
          <h1>Friend Requests</h1>
        </PopupTitle>

        <PopupTabbar>
          <PopupTabbarTab id={context === 'sent' ? 'tab_selected' : ''} onClick={() => setContext('sent')}>
            <SendIcon />
          </PopupTabbarTab>
          <PopupTabbarTab id={context === 'received' ? 'tab_selected' : ''} onClick={() => setContext('received')}>
            <MailIcon />
          </PopupTabbarTab>
        </PopupTabbar>

        <PopupFriendRequests>
          {context === 'sent' && (
            <>
              {state.friendRequestsPopup.sent && state.friendRequestsPopup.sent.length > 0 ? (
                state.friendRequestsPopup.sent.map((request) => (
                  <PopupFriendRequestsRequest key={request.userId}>
                    <img src={request.avatar} alt="" />
                    <p>{request.username}</p>
                    <PopupFriendRequestsRequestActions>
                      <CancelIcon id="decline" onClick={() => decline(request.userId)} />
                    </PopupFriendRequestsRequestActions>
                  </PopupFriendRequestsRequest>
                ))
              ) : (
                <PopupFriendRequestsNotFound>
                  <p>No Request Sent</p>
                </PopupFriendRequestsNotFound>
              )}
            </>
          )}

          {context === 'received' && (
            <>
              {state.friendRequestsPopup.received && state.friendRequestsPopup.received.length > 0 ? (
                state.friendRequestsPopup.received.map((request) => (
                  <PopupFriendRequestsRequest key={request.userId}>
                    <img src={request.avatar} alt="" />
                    <p>{request.username}</p>
                    <PopupFriendRequestsRequestActions>
                      <CancelIcon id="decline" onClick={() => decline(request.userId)} />
                      <CheckCircleIcon id="accept" onClick={() => accept(request.userId)} />
                    </PopupFriendRequestsRequestActions>
                  </PopupFriendRequestsRequest>
                ))
              ) : (
                <PopupFriendRequestsNotFound>
                  <p>No Request Received</p>
                </PopupFriendRequestsNotFound>
              )}
            </>
          )}
        </PopupFriendRequests>

        <PopupActionsCenter>
          <Button id="close" onClick={close}>
            Close
          </Button>
        </PopupActionsCenter>
      </Popup>
    </Container>
  );
};
