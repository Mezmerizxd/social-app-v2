import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import TextField from '../../../styled/components/inputs/TextField';
import Checkbox from '../../../styled/components/inputs/Checkbox';
import Button from '../../../styled/components/buttons/Button';
import { useEffect, useState } from 'react';
import Api from '../../../classes/Api';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setContext } from '../reducer';

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [errorValue, setErrorValue] = useState<string>(null);
  const [remember, setRemember] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // TODO: create a proper solution
    if (localStorage.getItem('remember') === 'true') window.location.href = '/messaging';
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
      if (remember) localStorage.setItem('remember', remember ? 'true' : 'false');
      localStorage.setItem('authorization', response.data.authorization);
      window.location.href = '/messaging';
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
        onChange={(e) => setPasswordValue(e.target.value)}
        value={passwordValue}
      />

      <Checkbox label="Remember Me" checked={remember} state={setRemember} />

      {errorValue && <p id="error">{errorValue}</p>}

      <Button onClick={handleLogin}>Login</Button>

      <p onClick={() => dispatch(setContext(1))}>Create an Account</p>
    </>
  );
}
