import { AddFriendPrpos } from './types';

import './styles.scss';
import { CustomTextField, CustomButton } from './styles';
import { useState } from 'react';
import Api from '../../classes/Api';

export default function AddFriend({ state, dispatch }: AddFriendPrpos) {
    const [usernameValue, setUsernameValue] = useState(null);
    const [error, setError] = useState(null);

    const close = () => {
        dispatch({
            type: 'SET_ADDFRIEND',
            data: {
                open: false,
            },
        });
    };

    const send = async () => {
        const response = await Api.Post(
            '/user/send-friend-request',
            {
                username: usernameValue,
            },
            true
        );
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
