import { TimeAgo } from '../../../lib/util';
import {
    Post,
    PostSidebar,
    PostSidebarAvatar,
    PostHeader,
    PostContent,
    PostContentContainer,
    PostHeaderDetails,
    PostHeaderOptions,
    PostContentOptionsContainer,
    PostContentOption,
} from './styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { handlePostOptionsUi, likePost } from '../reducer';

export default ({
    postId,
    userId,
    username,
    id,
    datePosted,
    avatar,
    comments,
    content,
    likes,
}: Client.Globe.Components.Models.Post) => {
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
            })
        );
    }

    function handleLikePost() {
        dispatch(likePost({ postId: postId }));
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
                        <p>{TimeAgo(JSON.parse(datePosted))}</p>
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
                        <FavoriteBorderIcon /> <p>{likes}</p>
                    </PostContentOption>
                    {/* <PostContentOption>
                        <CommentIcon /> <p>{comments}</p>
                    </PostContentOption> */}
                </PostContentOptionsContainer>
            </PostContentContainer>
        </Post>
    );
};
