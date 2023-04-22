import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { ViewPost, ViewPostPost, ViewPostReply, ViewPostReplies } from './styled';
import Post from '../models/Post';
import CreatePost from './widgets/CreatePost';
import { useEffect, useState } from 'react';
import Api from '../../../classes/Api';
import { addPost } from '../reducer';
import PostOptions from './PostOptions';

export default () => {
  const state = useAppSelector((state) => state.globe);
  const dispatch = useAppDispatch();

  const [post, setPost] = useState<Client.Globe.Components.Models.Post | null>(null);
  const [postReplies, setPostReplies] = useState<Client.Globe.Components.Models.Post[] | null>(null);

  useEffect(() => {
    setTimeout(async () => {
      const response = await Api.Post({
        api: '/globe/view-post',
        body: {
          postId: state.viewedPosts[state.viewingLevel - 1],
        },
      });
      if (response && response.success === true) {
        console.log(response);
        setPost(response.post);
        setPostReplies(response.replies);
      }
    });
  }, []);

  return (
    <ViewPost>
      <ViewPostPost>
        <Post
          postId={post?.postId}
          userId={post?.userId}
          username={post?.username}
          id={post?.id}
          createdAt={post?.createdAt}
          avatar={post?.avatar}
          replies={post?.replies}
          content={post?.content}
          likes={post?.likes}
          views={post?.views}
          shared={false}
        />
      </ViewPostPost>
      <ViewPostReply>
        <CreatePost />
      </ViewPostReply>
      <ViewPostReplies>
        {postReplies?.length > 0 &&
          postReplies?.map((post, i: number) => (
            <Post
              key={i}
              postId={post?.postId}
              userId={post?.userId}
              username={post?.username}
              id={post?.id}
              createdAt={post?.createdAt}
              avatar={post?.avatar}
              replies={post?.replies}
              content={post?.content}
              likes={post?.likes}
              views={post?.views}
              shared={false}
            />
          ))}
        {state.postOptions.open && <PostOptions />}
      </ViewPostReplies>
    </ViewPost>
  );
};
