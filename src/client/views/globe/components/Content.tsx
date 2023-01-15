import {
    Content,
    ContentCreatePostContainer,
    ContentPostsContainer,
} from './styled';
import CreatePost from './widgets/CreatePost';
import Post from '../models/Post';

export default () => {
    return (
        <Content>
            <ContentCreatePostContainer>
                <CreatePost />
            </ContentCreatePostContainer>
            <ContentPostsContainer>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </ContentPostsContainer>
        </Content>
    );
};
