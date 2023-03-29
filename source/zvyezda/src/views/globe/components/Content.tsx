import { Content, ContentCreatePostContainer, ContentPostsContainer } from './styled';
import CreatePost from './widgets/CreatePost';
import Post from '../models/Post';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import PostOptions from './PostOptions';
import { useEffect } from 'react';
import Api from '../../../classes/Api';
import { addPost } from '../reducer';

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
          console.log(response.posts[i]);
          dispatch(addPost(response.posts[i]));
        }
      }
    });
  }, []);

  return (
    <Content>
      <ContentCreatePostContainer>
        <CreatePost />
      </ContentCreatePostContainer>
      <ContentPostsContainer>
        {state?.posts?.length > 0 &&
          state?.posts?.map((post: Client.Globe.Components.Models.Post, i: number) => (
            <Post
              key={i}
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
          ))}
        {state.postOptions.open && <PostOptions />}
      </ContentPostsContainer>
    </Content>
  );
};
