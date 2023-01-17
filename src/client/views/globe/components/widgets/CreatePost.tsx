import { CreatePost } from './styled';
import Button from '../../../../styled/components/buttons/Button';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reduxHooks';
import { handleCreatePostUi, addPost } from '../../reducer';

export default () => {
    const state = useAppSelector((state) => state.globe);
    const dispatch = useAppDispatch();

    function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
        dispatch(handleCreatePostUi({ value: e.target.value }));
        if (e.target.value === '') {
            dispatch(handleCreatePostUi({ increment: 0 }));
        }
        if (state.createPost.increment < state.createPost.maxHeight) {
            if (e.target.scrollHeight > e.target.offsetHeight) {
                dispatch(
                    handleCreatePostUi({
                        increment: state.createPost.increment + 1,
                    })
                );
            }
        }
    }

    function handlePublish() {
        const date = JSON.stringify(new Date()); // TODO: Change to server side
        const post = {
            id: state?.posts?.length + 1,
            userId: state.account.userId,
            username: state.account.username,
            datePosted: date,
            avatar: state.account.avatar,
            comments: [],
            content: state.createPost.value,
            likes: [],
        };
        dispatch(addPost(post));
    }

    return (
        <CreatePost>
            <textarea
                name="post"
                id=""
                cols={30}
                rows={10}
                placeholder="Type your message here."
                onChange={handleTextArea.bind(this)}
                style={{ height: `${(state.createPost.increment + 1) * 20}px` }}
            ></textarea>
            <Button onClick={handlePublish}>Publish</Button>
        </CreatePost>
    );
};
