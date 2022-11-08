import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import './styles.scss';
import { CustomTextField, CustomButton, CustomCheckBox } from './styles';
import Api from '../../classes/Api';
import { useEffect, useState } from 'react';

interface SignupProps {
    dispatch: React.Dispatch<any>;
    contexts: any;
}

export default function Signup({ contexts, dispatch }: SignupProps) {
    const [emailValue, setEmailValue] = useState<string>(null);
    const [usernameValue, setUsernameValue] = useState<string>(null);
    const [passwordValue, setPassowrdValue] = useState<string>(null);
    const [errorValue, setErrorValue] = useState<string>(null);
    const [remember, setRemember] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('remember') === 'true')
            window.location.href = '/app';
    }, []);

    async function handleSignup() {
        setErrorValue(null);
        const response = await Api.Post(
            '/user/signup',
            {
                email: emailValue,
                username: usernameValue,
                password: passwordValue,
            },
            true
        );
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

            <CustomCheckBox
                label="Remember Me"
                checked={remember}
                state={setRemember}
            />

            {errorValue && <p id="error">{errorValue}</p>}

            <CustomButton onClick={handleSignup}>Signup</CustomButton>

            <p
                onClick={() =>
                    dispatch({
                        type: 'SET_CONTEXT',
                        data: { context: contexts.login },
                    })
                }
            >
                Login with existing account
            </p>
        </div>
    );
}
