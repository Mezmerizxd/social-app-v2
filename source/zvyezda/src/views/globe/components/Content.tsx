import { Content, ContentCreatePostContainer, ContentPostsContainer } from './styled';
import CreatePost from './widgets/CreatePost';
import Post from '../models/Post';
import { useAppSelector } from '../../../hooks/reduxHooks';
import PostOptions from './PostOptions';

export default () => {
  const state = useAppSelector((state) => state.globe);

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
              postId={post.id}
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
