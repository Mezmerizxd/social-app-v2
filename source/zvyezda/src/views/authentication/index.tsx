import { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Container, ContextContainer, ContextTitle } from './styled';
import { setWindowHref } from '../../lib/util';

export default function Authentication() {
  const state = useAppSelector((state) => state.authentication);

  useEffect(() => {
    // 1. Check if remember me is stored and if its true, if so do steps 2,3
    // 2. Check if theres a stored authorization key
    // 3. Check with the server and automatically sign in if its valid
  }, []);

  return (
    <Container>
      <title>{state.context === 0 ? 'Login' : 'Sign Up'}</title>
      <ContextContainer>
        <ContextTitle>
          <ArrowBackIcon onClick={() => setWindowHref('/')} />
          <h1>{state.context === 0 ? 'Login' : 'Sign Up'}</h1>
        </ContextTitle>
        {state.context === 0 && <Login />}
        {state.context === 1 && <Signup />}
      </ContextContainer>
    </Container>
  );
}
