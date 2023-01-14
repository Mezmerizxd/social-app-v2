import Button from '../../../../styled/components/buttons/Button';
import { useState } from 'react';
import Api from '../../../../classes/Api';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { rmMessage, toggleDeleteMessagePopup } from '../../reducer';
import {
    Container,
    Popup,
    PopupTitle,
    PopupContent,
    PopupError,
    PopupActions,
} from './styled';

export default function DeleteMessage() {
    const [error, setError] = useState(null);

    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.messaging);

    const close = () => {
        dispatch(toggleDeleteMessagePopup());
    };

    const confirm = async () => {
        const response = await Api.Post({
            api: '/messaging/delete-message',
            body: {
                messageId: state.selectedMessage.messageId,
                messagesGroupId: state.selectedFriend.messagesGroupId,
            },
        });
        if (response && response.success === true) {
            dispatch(rmMessage());
            close();
        } else {
            setError(response.error);
        }
    };

    return (
        <Container onClick={close}>
            <Popup onClick={(e) => e.stopPropagation()}>
                <PopupTitle>
                    <h1>Delete Message</h1>
                </PopupTitle>
                <PopupContent>
                    <p>Are you sure you want to delete this message?</p>
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
}
