import { Container, SidebarContainer, ContentContainer } from './styled';
import Optionbar from './components/Optionbar';

export default function Globe() {
    return (
        <Container>
            <SidebarContainer>
                <Optionbar />
            </SidebarContainer>

            <ContentContainer></ContentContainer>

            <SidebarContainer></SidebarContainer>
        </Container>
    );
}
