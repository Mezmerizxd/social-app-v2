import { Container, SidebarContainer, ContentContainer } from './styled';
import Optionbar from './components/Optionbar';
import Content from './components/Content';

export default () => {
    return (
        <Container>
            <SidebarContainer>
                <Optionbar />
            </SidebarContainer>

            <ContentContainer>
                <Content />
            </ContentContainer>

            <SidebarContainer></SidebarContainer>
        </Container>
    );
};
