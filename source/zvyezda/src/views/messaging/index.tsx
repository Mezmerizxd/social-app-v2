import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Container, MessagignError, MessagingContainer } from './styled';
import Sidebar from './components/Sidebar';
import Messages from './components/Messages';
import AddFriend from './components/popups/AddFriend';
import DeleteMessage from './components/popups/DeleteMessage';
import FriendRequests from './components/popups/FriendRequests';
import EditMessage from './components/popups/EditMessage';
import Settings from './components/popups/Settings';
import Features from './features';
import { setError, setFriends, setUserData } from './reducer';
import Api from '../../classes/Api';

export default () => {
  const [mobileMode, setMobileMode] = useState(false);

  const state = useAppSelector((state) => state.messaging);
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
    <Container>
      <title>Social App V2</title>

      {state.error !== null ? (
        <MessagignError>
          <h1>There was an error!</h1>
          <p>{state.error}</p>
        </MessagignError>
      ) : (
        <MessagingContainer>
          {/* {state.sidebar.open === true && ( */}
          <Sidebar mobileMode={mobileMode} />
          {/* )} */}

          {state.selectedFriend.messagesGroupId !== null && <Messages mobileMode={mobileMode} />}
        </MessagingContainer>
      )}

      {/* Popups */}
      {state.addFriendPopup.open && <AddFriend />}
      {state.friendRequestsPopup.open && <FriendRequests />}
      {state.settingsPopup.open && <Settings />}
      {state.deleteMessagePopup.open && <DeleteMessage />}
      {state.editMessagePopup.open && <EditMessage />}
    </Container>
  );
};
