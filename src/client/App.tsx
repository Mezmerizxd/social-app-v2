import './styles.scss';

export default function App() {
    return (
        <div className="App-container">
            <title>App</title>
            <div className="App-selection-container">
                <div className="App-selection">
                    <div className="App-selection-title">
                        <h1>Social App v2</h1>
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
                                        'https://github.com/mezmerizxd/social-app-v2',
                                        '_blank'
                                    )
                                }
                            >
                                Mezmerizxd
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
