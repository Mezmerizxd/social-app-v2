import './styles.scss';
import { CustomButton } from './styles';
import { useState } from 'react';
import Api from '../../classes/Api';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { rmMessage, toggleDeleteMessagePopup } from './reducer';

export default function DeleteMessage() {
    const [error, setError] = useState(null);

    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.application);

    const close = () => {
        dispatch(toggleDeleteMessagePopup());
    };

    const confirm = async () => {
        const response = await Api.Post(
            '/messaging/delete-message',
            {
                messageId: state.selectedMessage.messageId,
                messagesGroupId: state.selectedFriend.messagesGroupId,
            },
            true
        );
        if (response && response.success === true) {
            dispatch(rmMessage());
            close();
        } else {
            setError(response.error);
        }
    };

    return (
        <div className="Popup-container" onClick={close}>
            <div className="Popup-basic" onClick={(e) => e.stopPropagation()}>
                <div className="Popup-basic-title">
                    <h1>Delete Message</h1>
                </div>
                <div className="Popup-basic-content">
                    <p>Are you sure you want to delete this message?</p>
                </div>
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
