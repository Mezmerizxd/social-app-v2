import TextField from '../../../../styled/components/inputs/TextField';
import Button from '../../../../styled/components/buttons/Button';
import { useState } from 'react';
import Api from '../../../../classes/Api';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { editMessage, toggleEditMessagePopup } from '../../reducer';
import { Container, Popup, PopupActions, PopupContent, PopupError, PopupTitle } from './styled';

export default () => {
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();
  const state: Client.Messaging.InitialState = useAppSelector((state) => state.messaging);

  const [newMessage, setNewMessage] = useState(state.selectedMessage.message);

  const close = () => {
    dispatch(toggleEditMessagePopup());
  };

  const confirm = async () => {
    const response = await Api.Post({
      api: '/messaging/edit-message',
      body: {
        messageId: state.selectedMessage.messageId,
        messageGroupId: state.selectedFriend.messagesGroupId,
        message: newMessage,
      },
    });
    if (response && response.success === true) {
      dispatch(editMessage({ message: newMessage }));
      close();
    } else {
      setError(response.error);
    }
  };

  return (
    <Container onClick={close}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <PopupTitle>
          <h1>Edit Message</h1>
        </PopupTitle>
        <PopupContent>
          <TextField
            label={state.selectedMessage.message}
            type="text"
            id={'editMessage'}
            key={'editMessage'}
            name={'Edit Message'}
            autoFocus={true}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            value={newMessage}
          />
        </PopupContent>
        {error && (
          <PopupError>
            <p>{error}</p>
          </PopupError>
        )}
        <PopupActions>
          <Button id="close" onClick={close}>
            Cancel
          </Button>
          <Button id="send" onClick={confirm}>
            Confirm
          </Button>
        </PopupActions>
      </Popup>
    </Container>
  );
};
