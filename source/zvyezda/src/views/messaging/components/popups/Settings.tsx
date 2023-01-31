import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Features from '../../features';
import SettingsTextField from '../../../../styled/components/inputs/SettingsTextField';
import Button from '../../../../styled/components/buttons/Button';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../hooks/reduxHooks';
import {editUserData, toggleSettingsPopup} from '../../reducer';
import {
  Container,
  Popup,
  PopupActionsCenter,
  PopupSettingsContent,
  PopupSettingsContentAccount,
  PopupSettingsContentProfile,
  PopupSettingsContentProfileImage,
  PopupTitle,
} from './styled';

export default () => {
  const [editUsernameLocked, setEditUsernameLocked] = useState(true);
  const [editUsernameValue, setEditUsernameValue] = useState('');
  const [error, setError] = useState(null);
  const [editAvatar, setEditAvatar] = useState(false);
  const [editAvatarValue, setEditAvatarValue] = useState('');

  const state = useAppSelector((state) => state.messaging);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEditUsernameLocked(true);
    setEditUsernameValue(null);
  }, []);

  const close = () => {
    dispatch(toggleSettingsPopup());
  };

  const changeUsername = async () => {
    setError(null);
    const response = await Features.changeAccountUsername(editUsernameValue);
    if (response && response.success === true) {
      setEditUsernameLocked(!editUsernameLocked);
      dispatch(
        editUserData({
          username: editUsernameValue,
        }),
      );
    } else {
      setError(response.error);
    }
  };

  const changeAvatar = async () => {
    setError(null);
    if (editAvatarValue === state.user.avatar || editAvatarValue === '' || editAvatarValue === null) {
      setEditAvatar(!editAvatar);
      return;
    }
    const response = await Features.changeAccountAvatar(editAvatarValue);
    if (response && response.success === true) {
      setEditAvatar(!editAvatar);
      dispatch(
        editUserData({
          avatar: editAvatarValue,
        }),
      );
    } else {
      setError(response.error);
    }
  };

  return (
    <Container onClick={close}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>
          <h1>Settings</h1>
        </PopupTitle>
        <PopupSettingsContent>
          <PopupSettingsContentProfile>
            <PopupSettingsContentProfileImage>
              {editAvatar === false && (
                <EditIcon
                  style={{ background: '#61B84B' }}
                  onClick={() => {
                    setEditAvatar(true);
                  }}
                />
              )}
              {editAvatar === true && (
                <DoneIcon
                  style={{ background: '#61B84B' }}
                  onClick={() => {
                    changeAvatar();
                  }}
                />
              )}
              <img src={state.user.avatar ? state.user.avatar : 'https://i.pravatar.cc/300'} alt="" />
            </PopupSettingsContentProfileImage>
            {editUsernameLocked === true && (
              <SettingsTextField
                label={state.user.username}
                disabled={true}
                type="text"
                id="username"
                key="usernameInput"
                name="usernameInput"
                autoFocus={false}
              />
            )}
            {editUsernameLocked === false && (
              <SettingsTextField
                label={state.user.username}
                disabled={false}
                type="text"
                id="username"
                key="usernameInput2"
                name="usernameInput"
                autoFocus={true}
                onChange={(e) => setEditUsernameValue(e.target.value)}
                value={editUsernameValue}
              />
            )}
            <i>
              <EditIcon
                style={editUsernameLocked ? { background: '#61B84B' } : { background: '#E36C5A' }}
                onClick={() => {
                  setEditUsernameLocked(!editUsernameLocked);
                }}
              />
            </i>
            {editUsernameValue &&
              editUsernameLocked === false &&
              editUsernameValue !== null &&
              editUsernameValue !== '' && (
                <i>
                  <DoneIcon
                    style={{ background: '#61B84B' }}
                    onClick={() => {
                      changeUsername();
                    }}
                  />
                </i>
              )}
          </PopupSettingsContentProfile>
          {error && <p id="username-error">{error}</p>}
          <PopupSettingsContentAccount>
            {editAvatar === true && (
              <SettingsTextField
                label={`Example: https://i.pravatar.cc/300`}
                disabled={editAvatar ? false : true}
                type="url"
                id="avatar"
                key="avatar"
                name="avatar"
                value={editAvatarValue}
                onChange={(e) => setEditAvatarValue(e.target.value)}
              />
            )}
            <SettingsTextField
              label={`Email: ${state.user.email}`}
              disabled={true}
              type="text"
              id="email"
              key="email"
              name="email"
            />
            <SettingsTextField
              label={`User ID: ${state.user.userId}`}
              disabled={true}
              type="text"
              id="userid"
              key="userid"
              name="userid"
            />
          </PopupSettingsContentAccount>
        </PopupSettingsContent>
        <PopupActionsCenter>
          <Button id="close" onClick={close}>
            Close
          </Button>
        </PopupActionsCenter>
      </Popup>
    </Container>
  );
};
