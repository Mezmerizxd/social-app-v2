import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import MailIcon from '@mui/icons-material/Mail';
import { Container, MessagignError, MessagingContainer } from './styled';
import Sidebar from './components/Sidebar';
import Messages from './components/Messages';
import AddFriend from './components/popups/AddFriend';
import DeleteMessage from './components/popups/DeleteMessage';
import FriendRequests from './components/popups/FriendRequests';
import EditMessage from './components/popups/EditMessage';
import Settings from './components/popups/Settings';
import Features from './features';
import { addFriend, setError, setFriendRequestsPopupData, setFriends, setUserData } from './reducer';
import Api from '../../classes/Api';
import * as socketIo from 'socket.io-client';
import { setNotification } from '../../components/notifications/reducer';

export default () => {
  const [mobileMode, setMobileMode] = useState(false);
  const [socket, setSocket] =
    useState<socketIo.Socket<Server.Socket.ServerToClient & Server.Socket.ClientToServer>>(null);

  const state: Client.Messaging.InitialState = useAppSelector((state) => state.messaging);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('authorization') !== null) {
      setTimeout(async () => {
        const response = await Api.Post({
          api: '/profile',
          body: {},
        });
        if (response && response.success === true) {
          dispatch(setUserData(response));
          dispatch(setFriends(await Features.getFriends()));
        } else {
          dispatch(setError(response.error));
        }

        const { socketUrl } = await Api.Post({ api: '/get-socket-details', body: {} });
        const s: socketIo.Socket<Server.Socket.ServerToClient & Server.Socket.ClientToServer> = socketIo.io(socketUrl, {
          secure: false,
          rejectUnauthorized: false,
          reconnectionAttempts: 0,
          autoConnect: false,
        });
        s.connect();

        s.emit('join', {
          userId: response.userId,
          authorization: localStorage.getItem('authorization'),
        });

        s.on('receiveFriendRequest', (data: any) => {
          dispatch(
            setNotification({
              icon: <MailIcon />,
              message: `You have received a friend request from ${data.username}`,
              wait: 10000,
              closable: true,
            }),
          );
          dispatch(
            setFriendRequestsPopupData({
              sent: state.friendRequestsPopup.sent,
              received: state.friendRequestsPopup.received ? [...state?.friendRequestsPopup?.received, data] : [data],
            }),
          );
        });

        s.on('updateFriends', (data: any) => {
          dispatch(addFriend(data));
        });

        setSocket(s);
      });
    } else {
      window.location.href = '/authentication';
    }

    return () => {
      socket.emit('leave', {
        userId: state.user.userId,
        authorization: localStorage.getItem('authorization'),
      });
      socket.disconnect();
    };
  }, []);

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
          <Sidebar mobileMode={mobileMode} socket={socket} />
          {/* )} */}

          {state.selectedFriend.messagesGroupId !== null && <Messages mobileMode={mobileMode} socket={socket} />}
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
