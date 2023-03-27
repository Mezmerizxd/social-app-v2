import { CreatePost } from './styled';
import Button from '../../../../styled/components/buttons/Button';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { addPost, handleCreatePostUi } from '../../reducer';
import Api from '../../../../classes/Api';

export default () => {
  const state = useAppSelector((state) => state.globe);
  const dispatch = useAppDispatch();

  function resetTextArea() {
    dispatch(handleCreatePostUi({ value: '', increment: 0 }));
  }

  function handleTextAreOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch(handleCreatePostUi({ value: e.target.value }));
    if (e.target.value === '') {
      dispatch(handleCreatePostUi({ increment: 0 }));
    }
    if (state.createPost.increment < state.createPost.maxHeight) {
      if (e.target.scrollHeight > e.target.offsetHeight) {
        dispatch(
          handleCreatePostUi({
            increment: state.createPost.increment + 1,
          }),
        );
      }
    }
  }

  async function handlePublish() {
    // TODO: Change to server side
    const response = await Api.Post({
      api: '/globe/create-post',
      body: {
        content: state.createPost.value,
      },
    });
    if (response && response.success === true) {
      const date = new Date().toISOString();
      const post: Client.Globe.Post = {
        id: state?.posts?.length + 1,
        postId: response.post.postId,
        avatar: response.post.avatar,
        username: response.post.username,
        userId: response.post.userId,
        content: response.post.content,
        createdAt: date,
        likes: response.post.likes,
        shares: response.post.shares,
        replies: response.post.replies,
        views: response.post.views,
        shared: response.post.shared,
        sharedBy: response.post.sharedBy,
      };
      dispatch(addPost({ ...post, justCreated: true }));
      resetTextArea();
    } else {
      // setError(response.error);
      console.log(response.error);
    }
  }

  return (
    <CreatePost>
      <textarea
        name="post"
        id=""
        cols={30}
        rows={10}
        maxLength={500}
        placeholder="Type your message here."
        onChange={handleTextAreOnChange.bind(this)}
        value={state.createPost.value}
        style={{ height: `${(state.createPost.increment + 1) * 20}px` }}
      ></textarea>
      {state?.createPost?.value !== '' && <Button onClick={handlePublish}>Publish</Button>}
    </CreatePost>
  );
};
