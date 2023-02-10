import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import TextField from '../../../styled/components/inputs/TextField';
import Checkbox from '../../../styled/components/inputs/Checkbox';
import Button from '../../../styled/components/buttons/Button';
import Api from '../../../classes/Api';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setContext } from '../reducer';

export default function Signup() {
  const [emailValue, setEmailValue] = useState<string>(null);
  const [usernameValue, setUsernameValue] = useState<string>(null);
  const [passwordValue, setPasswordValue] = useState<string>(null);
  const [errorValue, setErrorValue] = useState<string>(null);
  const [remember, setRemember] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('remember') === 'true') window.location.href = '/app';
  }, []);

  async function handleSignup() {
    setErrorValue(null);
    const response = await Api.Post({
      api: '/account/signup',
      body: {
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
      },
    });
    if (response.success === true) {
      if (remember) localStorage.setItem('remember', remember ? 'true' : 'false');
      localStorage.setItem('authorization', response.authorization);
      window.location.href = '/globe';
    } else {
      setErrorValue(response.error);
    }
  }

  return (
    <>
      <TextField
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

      <TextField
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

      <TextField
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
        onChange={(e) => setPasswordValue(e.target.value)}
        value={passwordValue}
      />

      <Checkbox label="Remember Me" checked={remember} state={setRemember} />

      {errorValue && <p id="error">{errorValue}</p>}

      <Button onClick={handleSignup}>Signup</Button>

      <p onClick={() => dispatch(setContext(0))}>Login with existing account</p>
    </>
  );
}
