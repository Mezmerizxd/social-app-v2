import { useState } from 'react';
import { CreatePost } from './styled';
import Button from '../../../../styled/components/buttons/Button';

export default () => {
    const [state, setState] =
        useState<Client.Globe.Components.Widgets.CreatePost.State>({
            textArea: {
                increment: 0,
                maxHeight: 10,
                value: '',
            },
        });

    function handleTextAre(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setState({
            ...state,
            textArea: { ...state.textArea, value: e.target.value },
        });
        if (e.target.value === '') {
            setState({
                ...state,
                textArea: { ...state.textArea, increment: 0 },
            });
        }
        if (state.textArea.increment < state.textArea.maxHeight) {
            if (e.target.scrollHeight > e.target.offsetHeight) {
                setState({
                    ...state,
                    textArea: {
                        ...state.textArea,
                        increment: state.textArea.increment + 1,
                    },
                });
            }
        }
    }

    return (
        <CreatePost>
            <textarea
                name="post"
                id=""
                cols={30}
                rows={10}
                placeholder="Type your message here."
                onChange={handleTextAre.bind(this)}
                style={{ height: `${(state.textArea.increment + 1) * 20}px` }}
            ></textarea>
            <Button>Post</Button>
        </CreatePost>
    );
};
