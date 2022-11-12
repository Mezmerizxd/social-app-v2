import { AddFriendPrpos } from './types';

import './styles.scss';
import { CustomTextField, CustomButton } from './styles';

export default function AddFriend({ state, dispatch }: AddFriendPrpos) {
    const close = () => {
        dispatch({
            type: 'SET_ADDFRIEND',
            data: {
                open: false,
            },
        });
    };

    return (
        state.addFriend.open && (
            <div className="Popup-container" onClick={close}>
                <div
                    className="Popup-basic"
                    onClick={(e) => e.stopPropagation()}
                >
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
                        />
                    </div>
                    {(state.addFriend.error && state.addFriend.error !== '') ||
                        (null && (
                            <div className="Popup-basic-error">
                                <p>{state.addFriend.error}</p>
                            </div>
                        ))}
                    <div className="Popup-basic-actions">
                        <CustomButton id="close" onClick={close}>
                            Close
                        </CustomButton>
                        <CustomButton id="send">Send</CustomButton>
                    </div>
                </div>
            </div>
        )
    );
}
