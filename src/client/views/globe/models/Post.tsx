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

export default () => {
    return (
        <Post>
            <PostSidebar>
                <PostSidebarAvatar>
                    <img
                        src="https://avatars.githubusercontent.com/u/52637194"
                        alt=""
                    />
                </PostSidebarAvatar>
            </PostSidebar>
            <PostContentContainer>
                <PostHeader>
                    <PostHeaderDetails>
                        <h1>UserName555</h1>
                        <p>@username555</p>
                    </PostHeaderDetails>
                    <PostHeaderOptions>
                        <i>***</i>
                    </PostHeaderOptions>
                </PostHeader>
                <PostContent>This is a short post</PostContent>
            </PostContentContainer>
        </Post>
    );
};
