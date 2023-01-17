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
    return (
        <Post key={id}>
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
                        {/* <p>@username555</p> */}
                    </PostHeaderDetails>
                    <PostHeaderOptions>
                        <i>***</i>
                    </PostHeaderOptions>
                </PostHeader>
                <PostContent>
                    <p>{content}</p>
                </PostContent>
                <PostContentOptionsContainer>
                    <PostContentOption>
                        <FavoriteBorderIcon /> <p>{likes}</p>
                    </PostContentOption>
                    <PostContentOption>
                        <CommentIcon /> <p>{comments}</p>
                    </PostContentOption>
                </PostContentOptionsContainer>
            </PostContentContainer>
        </Post>
    );
};
