import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { deletePost, handlePostOptionsUi } from '../reducer';
import { PostOption, PostOptions, PostOptionsContainer } from './styled';
import DeleteIcon from '@mui/icons-material/Delete';

export default () => {
  const state: Client.Globe.InitialState = useAppSelector((state) => state.globe);
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
      }),
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
        {state.account.userId === state.postOptions.selectedPostUserId && (
          <PostOption onClick={handleDeletePost}>
            <DeleteIcon />
            Delete
          </PostOption>
        )}
      </PostOptions>
    </PostOptionsContainer>
  );
};
