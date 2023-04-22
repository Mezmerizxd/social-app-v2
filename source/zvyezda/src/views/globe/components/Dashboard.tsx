import { Dashboard, DashboardCreatePostContainer, DashboardPostsContainer } from './styled';
import CreatePost from './widgets/CreatePost';
import Post from '../models/Post';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import PostOptions from './PostOptions';
import { useEffect } from 'react';
import Api from '../../../classes/Api';
import { addPost, viewPost } from '../reducer';

export default () => {
  const state = useAppSelector((state) => state.globe);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(async () => {
      const response = await Api.Post({
        api: '/globe/following-posts',
        body: {
          content: state.createPost.value,
        },
      });
      if (response && response.success === true) {
        // dispatch(addPost(post));
        for (let i = 0; i < response.posts.length; i++) {
          dispatch(addPost(response.posts[i]));
        }
      }
    });
  }, []);

  return (
    <Dashboard>
      <DashboardCreatePostContainer>
        <CreatePost />
      </DashboardCreatePostContainer>
      <DashboardPostsContainer>
        {state?.posts?.length > 0 &&
          state?.posts?.map((post: Client.Globe.Components.Models.Post, i: number) => (
            <div
              key={i}
              onClick={() => {
                dispatch(viewPost(post.postId));
              }}
            >
              <Post
                postId={post.postId}
                userId={post.userId}
                username={post.username}
                id={post.id}
                createdAt={post.createdAt}
                avatar={post.avatar}
                replies={post.replies}
                content={post.content}
                likes={post.likes}
                views={post.views}
                shared={false}
              />
            </div>
          ))}
        {state.postOptions.open && <PostOptions />}
      </DashboardPostsContainer>
    </Dashboard>
  );
};
