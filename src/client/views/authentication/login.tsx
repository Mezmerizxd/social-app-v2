import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';

import './styles.scss';
import { CustomTextField, CustomButton } from './styles';
import { useState } from 'react';
import Api from '../../classes/Api';

interface LoginProps {
    dispatch: React.Dispatch<any>;
    contexts: any;
}

export default function Login({ contexts, dispatch }: LoginProps) {
    const [emailValue, setEmailValue] = useState<string>(null);
    const [passwordValue, setPassowrdValue] = useState<string>(null);
    const [errorValue, setErrorValue] = useState<string>(null);

    async function handleLogin() {
        setErrorValue(null);
        const response = await Api.Post(
            '/user/login',
            {
                email: emailValue,
                password: passwordValue,
            },
            true
        );
        if (response && response.success === false) {
            setErrorValue(response.error);
        }
    }

    return (
        <div className="Login-container">
            <CustomTextField
                id="email"
                label="Email"
                key="email"
                type="text"
                autoFocus={true}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                onChange={(e) => setEmailValue(e.target.value)}
            />

            <CustomTextField
                id="password"
                label="Password"
                key="password"
                type="password"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <KeyIcon />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                onChange={(e) => setPassowrdValue(e.target.value)}
            />

            {errorValue && <p id="error">{errorValue}</p>}

            <CustomButton onClick={handleLogin}>Login</CustomButton>

            <p
                onClick={() =>
                    dispatch({
                        type: 'SET_CONTEXT',
                        data: { context: contexts.signup },
                    })
                }
            >
                Create an Account
            </p>
        </div>
    );
}
