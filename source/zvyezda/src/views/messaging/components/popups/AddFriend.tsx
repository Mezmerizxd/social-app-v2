import TextField from '../../../../styled/components/inputs/TextField';
import Button from '../../../../styled/components/buttons/Button';
import { useState } from 'react';
import Api from '../../../../classes/Api';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { toggleAddFriendPopup } from '../../reducer';
import { Container, Popup, PopupActions, PopupContent, PopupError, PopupTitle } from './styled';

export default () => {
  const [usernameValue, setUsernameValue] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(toggleAddFriendPopup());
  };

  const send = async () => {
    const response = await Api.Post({
      api: '/profile/add-friend',
      body: {
        username: usernameValue,
      },
    });
    if (response && response.success === true) {
      close();
    } else {
      setError(response.error);
    }
  };

  return (
    <Container onClick={close}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>
          <h1>Add Friend</h1>
        </PopupTitle>
        <PopupContent>
          <TextField
            label={'Enter a username'}
            type="text"
            id={'addfriend'}
            key={'addfriend'}
            name={'Add Friend'}
            autoFocus={true}
            onChange={(e) => {
              setUsernameValue(e.target.value);
            }}
            value={usernameValue}
          />
        </PopupContent>
        {error && (
          <PopupError>
            <p>{error}</p>
          </PopupError>
        )}
        <PopupActions>
          <Button id="close" onClick={close}>
            Close
          </Button>
          <Button id="send" onClick={send}>
            Send
          </Button>
        </PopupActions>
      </Popup>
    </Container>
  );
};
