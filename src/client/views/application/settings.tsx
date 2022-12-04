import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Features from './features';
import './styles.scss';
import { CustomButton, CustomSettingsInputField } from './styles';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { editUserData, toggleSettingsPopup } from './reducer';

export default function Settings() {
    const [editUsernameLocked, setEditUsernameLocked] = useState(true);
    const [editUsernameValue, setEditUsernameValue] = useState(null);
    const [error, setError] = useState(null);
    const [editAvatar, setEditAvatar] = useState(false);
    const [editAvatarValue, setEditAvatarValue] = useState(null);

    const state = useAppSelector((state) => state.application);
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
        const response = await Features.changeAccountUsername(
            editUsernameValue
        );
        if (response && response.success === true) {
            setEditUsernameLocked(!editUsernameLocked);
            dispatch(
                editUserData({
                    username: editUsernameValue,
                })
            );
        } else {
            setError(response.error);
        }
    };

    const changeAvatar = async () => {
        setError(null);
        if (
            editAvatarValue === state.user.avatar ||
            editAvatarValue === '' ||
            editAvatarValue === null
        ) {
            setEditAvatar(!editAvatar);
            return;
        }
        const response = await Features.changeAccountAvatar(editAvatarValue);
        if (response && response.success === true) {
            setEditAvatar(!editAvatar);
            dispatch(
                editUserData({
                    avatar: editAvatarValue,
                })
            );
        } else {
            setError(response.error);
        }
    };

    return (
        <div className="Popup-container" onClick={close}>
            <div className="Popup-basic" onClick={(e) => e.stopPropagation()}>
                <div className="Popup-basic-title">
                    <h1>Settings</h1>
                </div>
                <div className="Popup-settings-content">
                    <div className="Settings-content-profile">
                        <div className="Settings-content-profile-image">
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
                            <img
                                src={
                                    state.user.avatar
                                        ? state.user.avatar
                                        : 'https://i.pravatar.cc/300'
                                }
                                alt=""
                            />
                        </div>
                        {editUsernameLocked === true && (
                            <CustomSettingsInputField
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
                            <CustomSettingsInputField
                                label={state.user.username}
                                disabled={false}
                                type="text"
                                id="username"
                                key="usernameInput2"
                                name="usernameInput"
                                autoFocus={true}
                                onChange={(e) =>
                                    setEditUsernameValue(e.target.value)
                                }
                                value={editUsernameValue}
                            />
                        )}
                        <i>
                            <EditIcon
                                style={
                                    editUsernameLocked
                                        ? { background: '#61B84B' }
                                        : { background: '#E36C5A' }
                                }
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
                    </div>
                    {error && <p className="username-error">{error}</p>}
                    <div className="Settings-content-account">
                        {editAvatar === true && (
                            <CustomSettingsInputField
                                label={`Example: https://i.pravatar.cc/300`}
                                disabled={editAvatar ? false : true}
                                type="url"
                                id="avatar"
                                key="avatar"
                                name="avatar"
                                value={editAvatarValue}
                                onChange={(e) =>
                                    setEditAvatarValue(e.target.value)
                                }
                            />
                        )}
                        <CustomSettingsInputField
                            label={`Email: ${state.user.email}`}
                            disabled={true}
                            type="text"
                            id="email"
                            key="email"
                            name="email"
                        />
                        <CustomSettingsInputField
                            label={`User ID: ${state.user.userId}`}
                            disabled={true}
                            type="text"
                            id="userid"
                            key="userid"
                            name="userid"
                        />
                    </div>
                </div>
                <div className="Popup-basic-action-center">
                    <CustomButton id="close" onClick={close}>
                        Close
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
