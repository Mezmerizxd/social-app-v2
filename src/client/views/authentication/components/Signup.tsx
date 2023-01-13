import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import { CustomTextField, CustomButton, CustomCheckBox } from '../styles';
import Api from '../../../classes/Api';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setContext } from '../reducer';

export default function Signup() {
    const [emailValue, setEmailValue] = useState<string>(null);
    const [usernameValue, setUsernameValue] = useState<string>(null);
    const [passwordValue, setPassowrdValue] = useState<string>(null);
    const [errorValue, setErrorValue] = useState<string>(null);
    const [remember, setRemember] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('remember') === 'true')
            window.location.href = '/app';
    }, []);

    async function handleSignup() {
        setErrorValue(null);
        const response = await Api.Post({
            api: '/user/signup',
            body: {
                email: emailValue,
                username: usernameValue,
                password: passwordValue,
            },
        });
        if (response.success === true) {
            if (remember)
                localStorage.setItem('remember', remember ? 'true' : 'false');
            localStorage.setItem('authorization', response.data.authorization);
            window.location.href = '/app';
        } else {
            setErrorValue(response.error);
        }
    }

    return (
        <div className="Signup-container">
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
                id="username"
                label="Username"
                key="username"
                type="text"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                onChange={(e) => setUsernameValue(e.target.value)}
                value={usernameValue}
            />

            <CustomTextField
                id="password"
                label="Password (USE FAKE PASSWORD)"
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

            <CustomButton onClick={handleSignup}>Signup</CustomButton>

            <p onClick={() => dispatch(setContext('Login'))}>
                Login with existing account
            </p>
        </div>
    );
}
