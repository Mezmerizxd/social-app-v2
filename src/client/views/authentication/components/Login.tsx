import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';

import { CustomTextField, CustomButton, CustomCheckBox } from '../styles';
import { useEffect, useState } from 'react';
import Api from '../../../classes/Api';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setContext } from '../reducer';

export default function Login({ contexts }: Client.Authentication.Login) {
    const [emailValue, setEmailValue] = useState<string>(null);
    const [passwordValue, setPassowrdValue] = useState<string>(null);
    const [errorValue, setErrorValue] = useState<string>(null);
    const [remember, setRemember] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // TODO: create a proper solution
        if (localStorage.getItem('remember') === 'true')
            window.location.href = '/messaging';
    }, []);

    async function handleLogin() {
        setErrorValue(null);
        const response = await Api.Post({
            api: '/user/login',
            body: {
                email: emailValue,
                password: passwordValue,
            },
        });
        if (response.success === true) {
            if (remember)
                localStorage.setItem('remember', remember ? 'true' : 'false');
            localStorage.setItem('authorization', response.data.authorization);
            window.location.href = '/messaging';
        } else {
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
                value={emailValue}
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
                value={passwordValue}
            />

            <CustomCheckBox
                label="Remember Me"
                checked={remember}
                state={setRemember}
            />

            {errorValue && <p id="error">{errorValue}</p>}

            <CustomButton onClick={handleLogin}>Login</CustomButton>

            <p onClick={() => dispatch(setContext(contexts.signup))}>
                Create an Account
            </p>
        </div>
    );
}
