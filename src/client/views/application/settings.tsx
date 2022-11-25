import { SettingsPrpos } from './types';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Features from './features';

import './styles.scss';
import { CustomButton, CustomSettingsInputField } from './styles';
import React, { useState, useEffect } from 'react';

export default function Settings({ state, dispatch }: SettingsPrpos) {
    const [editUsernameLocked, setEditUsernameLocked] = useState(true);
    const [editUsernameValue, setEditUsernameValue] = useState(null);
    const [editUsernameError, setEditUsernameError] = useState(null);

    useEffect(() => {
        setEditUsernameLocked(true);
        setEditUsernameValue(null);
    }, []);

    const close = () => {
        dispatch({
            type: 'SET_SETTINGS',
            data: {
                open: false,
            },
        });
    };

    const changeUsername = async () => {
        setEditUsernameError(null);
        const response = await Features.changeAccountUsername(
            editUsernameValue
        );
        if (response && response.success === true) {
            setEditUsernameLocked(!editUsernameLocked);
            // TODO: update the entire state
            window.location.href = '/app';
        } else {
            setEditUsernameError(response.error);
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
                            <EditIcon style={{ background: '#61B84B' }} />
                            <img src="https://i.pravatar.cc/300" alt="" />
                        </div>
                        {editUsernameLocked === true && (
                            <CustomSettingsInputField
                                label={state.settings.username}
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
                                label={state.settings.username}
                                disabled={false}
                                type="text"
                                id="username"
                                key="usernameInput2"
                                name="usernameInput"
                                autoFocus={true}
                                onChange={(e) =>
                                    setEditUsernameValue(e.target.value)
                                }
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
                    {editUsernameError && (
                        <p className="username-error">{editUsernameError}</p>
                    )}
                    <div className="Settings-content-account">
                        <CustomSettingsInputField
                            label={`Email: ${state.settings.email}`}
                            disabled={true}
                            type="text"
                            id="email"
                            key="email"
                            name="email"
                        />
                        <CustomSettingsInputField
                            label={`User ID: ${state.settings.userId}`}
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
