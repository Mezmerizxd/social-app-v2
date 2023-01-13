import { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './styles.scss';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setContext } from './reducer';

export default function Authentication() {
    const state = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setContext(Client.Authentication.ContextPages.login));
        // 1. Check if remember me is stored and if its true, if so do steps 2,3
        // 2. Check if theres a stored authorization key
        // 3. Check with the server and automatically sign in if its valid
    }, []);

    return (
        <div className="Authentication-container">
            <title>{state.context}</title>
            <div className="Authentication-context-container">
                <div className="Authentication-context-title">
                    <ArrowBackIcon
                        onClick={() => (window.location.href = '/')}
                    />
                    <h1>{state.context}</h1>
                </div>
                {state.context === Client.Authentication.ContextPages.login && (
                    <Login contexts={Client.Authentication.ContextPages} />
                )}
                {state.context ===
                    Client.Authentication.ContextPages.signup && (
                    <Signup contexts={Client.Authentication.ContextPages} />
                )}
            </div>
        </div>
    );
}
