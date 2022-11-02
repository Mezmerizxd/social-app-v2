import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';

import './styles.scss';
import { CustomTextField, CustomButton } from './styles';

interface LoginProps {
    dispatch: React.Dispatch<any>;
    contexts: any;
}

export default function Login({ contexts, dispatch }: LoginProps) {
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
                onChange={(e) =>
                    dispatch({
                        type: 'SET_LOGIN_EMAIL',
                        data: { email: e.target.value },
                    })
                }
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
                onChange={(e) =>
                    dispatch({
                        type: 'SET_LOGIN_PASSWORD',
                        data: { password: e.target.value },
                    })
                }
            />

            <CustomButton>Login</CustomButton>

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
