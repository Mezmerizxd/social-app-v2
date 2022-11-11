import { InitialDataProps } from './reducer';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

import './styles.scss';
import { CustomButton, CustomSettingsInputField } from './styles';
import React, { useState, useEffect } from 'react';

interface SettingsPrpos {
    state: InitialDataProps;
    dispatch: React.Dispatch<any>;
}

export default function Settings({ state, dispatch }: SettingsPrpos) {
    const [editUsernameLocked, setEditUsernameLocked] = useState(true);
    const [editUsernameValue, setEditUsernameValue] = useState(null);

    useEffect(() => {
        setEditUsernameLocked(true)
        setEditUsernameValue(null)
    }, [])
    
    const close = () => {
        dispatch({
            type: 'SET_SETTINGS',
            data: {
                open: false,
            },
        });
    };

    return (
        state.settings.open && (
            <div className="Popup-container" onClick={close}>
                <div
                    className="Popup-basic"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="Popup-basic-title">
                        <h1>Settings</h1>
                    </div>
                    <div className="Popup-settings-content">
                        <div className="Settings-content-profile">
                            <img src="https://i.pravatar.cc/300" alt="" />
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
                                editUsernameValue !== null && editUsernameValue !== "" && (
                                    <i>
                                        <DoneIcon
                                            style={{ background: '#61B84B' }}
                                            onClick={() => {
                                                setEditUsernameLocked(
                                                    !editUsernameLocked
                                                );
                                            }}
                                        />
                                    </i>
                                )}
                        </div>
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
        )
    );
}
