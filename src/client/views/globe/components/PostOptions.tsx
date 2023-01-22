import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { handlePostOptionsUi, deletePost } from '../reducer';
import { PostOptionsContainer, PostOptions, PostOption } from './styled';
import DeleteIcon from '@mui/icons-material/Delete';

export default () => {
    const state: Client.Globe.InitialState = useAppSelector(
        (state) => state.globe
    );
    const dispatch = useAppDispatch();

    function close() {
        dispatch(
            handlePostOptionsUi({
                posX: 0,
                posY: 0,
                open: false,
                selectedPostId: 0,
                selectedPostUserId: 0,
                selectedPostUsername: '',
            })
        );
    }

    function handleDeletePost() {
        dispatch(deletePost({ postId: state.postOptions.selectedPostId }));
        close();
    }

    return (
        <PostOptionsContainer onClick={close}>
            <PostOptions
                onClick={(e) => e.stopPropagation()}
                style={{
                    top: `${state.postOptions.posY}px`,
                    left: `${state.postOptions.posX}px`,
                }}
            >
                <PostOption onClick={handleDeletePost}>
                    <DeleteIcon />
                    <p>Delete</p>
                </PostOption>
            </PostOptions>
        </PostOptionsContainer>
    );
};
