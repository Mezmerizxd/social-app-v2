import './styles.scss';
import { CustomButton, CustomTextField } from './styles';
import { useState } from 'react';
import Api from '../../classes/Api';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { editMessage, toggleEditMessagePopup } from './reducer';

export default function EditMessage() {
    const [error, setError] = useState(null);

    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.application);

    const [newMessage, setNewMessage] = useState(state.selectedMessage.content);

    const close = () => {
        dispatch(toggleEditMessagePopup());
    };

    const confirm = async () => {
        const response = await Api.Post({
            api: '/messaging/edit-message',
            body: {
                messageId: state.selectedMessage.messageId,
                messagesGroupId: state.selectedFriend.messagesGroupId,
                content: newMessage,
            },
        });
        if (response && response.success === true) {
            dispatch(editMessage({ content: newMessage }));
            close();
        } else {
            setError(response.error);
        }
    };

    return (
        <div className="Popup-container" onClick={close}>
            <div className="Popup-basic" onClick={(e) => e.stopPropagation()}>
                <div className="Popup-basic-title">
                    <h1>Edit Message</h1>
                </div>
                <CustomTextField
                    label={state.selectedMessage.content}
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
                {error && (
                    <div className="Popup-basic-error">
                        <p>{error}</p>
                    </div>
                )}
                <div className="Popup-basic-actions">
                    <CustomButton id="close" onClick={close}>
                        Cancel
                    </CustomButton>
                    <CustomButton id="send" onClick={confirm}>
                        Confirm
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
