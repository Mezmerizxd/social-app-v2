import { TimeAgo } from '../../../lib/util';
import {
  Post,
  PostContent,
  PostContentContainer,
  PostContentOption,
  PostContentOptionsContainer,
  PostHeader,
  PostHeaderDetails,
  PostHeaderOptions,
  PostSidebar,
  PostSidebarAvatar,
} from './styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentIcon from '@mui/icons-material/Comment';
import EyeIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { handlePostOptionsUi, likePost } from '../reducer';

export default ({
  postId,
  userId,
  username,
  id,
  createdAt,
  avatar,
  replies,
  content,
  likes,
  views,
}: Client.Globe.Components.Models.Post) => {
  const state: Client.Globe.InitialState = useAppSelector((state) => state.globe);
  const dispatch = useAppDispatch();

  function handleOptions(e: any) {
    const x = e.clientX;
    const y = e.clientY;
    dispatch(
      handlePostOptionsUi({
        posX: x,
        posY: y,
        open: true,
        selectedPostId: postId,
        selectedPostUserId: userId,
        selectedPostUsername: username,
      }),
    );
  }

  function handleLikePost() {
    dispatch(likePost({ postId: postId, userId: state.account.userId }));
  }

  return (
    <Post key={id + postId + userId}>
      <PostSidebar>
        <PostSidebarAvatar>
          <img src={avatar} alt="" />
        </PostSidebarAvatar>
      </PostSidebar>
      <PostContentContainer>
        <PostHeader>
          <PostHeaderDetails>
            <h1>{username}</h1>
            <p>{TimeAgo(JSON.parse(createdAt))}</p>
          </PostHeaderDetails>
          <PostHeaderOptions onClick={(e: any) => handleOptions(e)}>
            <MoreHorizIcon />
          </PostHeaderOptions>
        </PostHeader>
        <PostContent>
          <p>{content}</p>
        </PostContent>
        <PostContentOptionsContainer>
          <PostContentOption onClick={handleLikePost}>
            <FavoriteBorderIcon /> <p>{likes.length}</p>
          </PostContentOption>
          <PostContentOption>
            <CommentIcon /> <p>{replies.length}</p>
          </PostContentOption>
          <PostContentOption>
            <EyeIcon /> <p>{views}</p>
          </PostContentOption>
        </PostContentOptionsContainer>
      </PostContentContainer>
    </Post>
  );
};
