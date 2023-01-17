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
} from './styled';

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
        <Post key={id} id={postId}>
            <PostSidebar>
                <PostSidebarAvatar>
                    <img src={avatar} alt="" />
                </PostSidebarAvatar>
            </PostSidebar>
            <PostContentContainer>
                <PostHeader>
                    <PostHeaderDetails>
                        <h1 id={userId}>{username}</h1>
                        <p>{TimeAgo(JSON.parse(datePosted))}</p>
                        {/* <p>@username555</p> */}
                    </PostHeaderDetails>
                    <PostHeaderOptions>
                        <i>***</i>
                    </PostHeaderOptions>
                </PostHeader>
                <PostContent>{content}</PostContent>
                <p>
                    Likes: {likes.length} | Comments: {comments.length}
                </p>
            </PostContentContainer>
        </Post>
    );
};
