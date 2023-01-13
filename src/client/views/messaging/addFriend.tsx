import './styles.scss';
import { CustomTextField, CustomButton } from './styles';
import { useState } from 'react';
import Api from '../../classes/Api';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { toggleAddFriendPopup } from './reducer';

export default function AddFriend() {
    const [usernameValue, setUsernameValue] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useAppDispatch();

    const close = () => {
        dispatch(toggleAddFriendPopup());
    };

    const send = async () => {
        const response = await Api.Post({
            api: '/user/send-friend-request',
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
        <div className="Popup-container" onClick={close}>
            <div className="Popup-basic" onClick={(e) => e.stopPropagation()}>
                <div className="Popup-basic-title">
                    <h1>Add Friend</h1>
                </div>
                <div className="Popup-basic-content">
                    <CustomTextField
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
                </div>
                {error && (
                    <div className="Popup-basic-error">
                        <p>{error}</p>
                    </div>
                )}
                <div className="Popup-basic-actions">
                    <CustomButton id="close" onClick={close}>
                        Close
                    </CustomButton>
                    <CustomButton id="send" onClick={send}>
                        Send
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
