import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';

import './styles.scss';
import { CustomTextField, CustomButton } from './styles';

interface SignupProps {
    dispatch: React.Dispatch<any>;
    contexts: any;
}

export default function Signup({ contexts, dispatch }: SignupProps) {
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
                onChange={(e) =>
                    dispatch({
                        type: 'SET_SIGNUP_EMAIL',
                        data: { email: e.target.value },
                    })
                }
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
                onChange={(e) =>
                    dispatch({
                        type: 'SET_SIGNUP_USERNAME',
                        data: { username: e.target.value },
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
                        type: 'SET_SIGNUP_PASSWORD',
                        data: { password: e.target.value },
                    })
                }
            />

            <CustomButton>Signup</CustomButton>

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
