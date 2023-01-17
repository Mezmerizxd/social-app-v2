import { Container, SidebarContainer, ContentContainer } from './styled';
import Optionbar from './components/Optionbar';
import Content from './components/Content';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';

export default () => {
    const state = useAppSelector((state) => state.globe);
    const dispatch = useAppDispatch();

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
