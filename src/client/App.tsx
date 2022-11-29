import { useEffect } from 'react';
import Api from './classes/Api';
import { useAppSelector, useAppDispatch } from './hooks/reduxHooks';
import { setInfo } from './reducer';
import './styles.scss';

export default function App() {
    const state = useAppSelector((state) => state.source);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(async () => {
            const response = await Api.Post('/info', null, true);
            if (response.success === true) {
                dispatch(setInfo(response.data));
            }
        });
    }, []);

    return (
        <div className="App-container">
            <title>App</title>
            <div className="App-selection-container">
                <div className="App-selection">
                    <div className="App-selection-title">
                        <h1>Social App v2</h1>
                        <a href={state.repository}>
                            <p>
                                {state.name} - v{state.version}
                            </p>
                        </a>
                    </div>
                    <div className="App-selection-options">
                        <button
                            onClick={() =>
                                (window.location.href = '/authentication')
                            }
                        >
                            Login
                        </button>
                        <button onClick={() => (window.location.href = '/app')}>
                            Dev
                        </button>
                    </div>
                    <div className="App-selection-footer">
                        <p>
                            Made by{' '}
                            <span
                                onClick={() =>
                                    window.open(
                                        'https://github.com/mezmerizxd/',
                                        '_blank'
                                    )
                                }
                            >
                                {state.author}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
