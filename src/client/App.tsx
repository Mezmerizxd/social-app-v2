import { useEffect, useState } from 'react';
import { setWindowHref } from './lib/util';
import {
    Container,
    SelectionContainer,
    Selection,
    SelectionTitle,
    SelectionOptionsContainer,
    SelectionOptions,
    SelectionFooter,
} from './styled';

export default function App() {
    const [state, setState] = useState(null);

    useEffect(() => {
        setTimeout(async () => {
            const r = await fetch(
                'https://raw.githubusercontent.com/Mezmerizxd/social-app-v2/main/package.json'
            )
                .then((res) => res.json())
                .then((res) => {
                    return res;
                });
            setState(r);
        });
    }, []);

    return (
        <Container>
            <title>App</title>
            <SelectionContainer>
                <Selection>
                    <SelectionTitle>
                        <h1>Social App v2</h1>
                        <a href={state?.repository}>
                            <p>
                                {state?.name} - v{state?.version}
                            </p>
                        </a>
                    </SelectionTitle>
                    <SelectionOptionsContainer>
                        <SelectionOptions>
                            <button
                                onClick={() => setWindowHref('/authentication')}
                            >
                                Login
                            </button>
                            <button onClick={() => setWindowHref('/messaging')}>
                                Messaging
                            </button>
                            <button onClick={() => setWindowHref('/globe')}>
                                The Globe
                            </button>
                        </SelectionOptions>
                    </SelectionOptionsContainer>
                    <SelectionFooter>
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
                                {state?.author}
                            </span>
                        </p>
                    </SelectionFooter>
                </Selection>
            </SelectionContainer>
        </Container>
    );
}
