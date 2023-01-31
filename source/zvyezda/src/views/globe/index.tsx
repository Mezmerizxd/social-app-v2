import { Container, SidebarContainer, ContentContainer } from './styled';
import Optionbar from './components/Optionbar';
import Content from './components/Content';
import PostOptions from './components/PostOptions';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import Api from '../../classes/Api';
import { setAccount } from './reducer';

export default () => {
  const state: Client.Globe.InitialState = useAppSelector((state) => state.globe);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(async () => {
      // const response = await Api.Post({
      //   api: '/user/get-user-data',
      //   body: {
      //     method: 'authorization',
      //     key: localStorage.getItem('authorization'),
      //   },
      // });
      // if (response && response.success === true) {
      //   dispatch(setAccount(response.data));
      // }
    });
  }, []);

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
