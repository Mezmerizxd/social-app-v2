import { Container, ContentContainer, SidebarContainer } from './styled';
import Optionbar from './components/Optionbar';
import Dashboard from './components/Dashboard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { setAccount } from './reducer';
import Api from '../../classes/Api';
import ViewPost from './components/ViewPost';

export default () => {
  const state: Client.Globe.InitialState = useAppSelector((state) => state.globe);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(async () => {
      const response = await Api.Post({
        api: '/profile',
        body: {
          method: 'authorization',
          key: localStorage.getItem('authorization'),
        },
      });
      if (response && response.success === true) {
        dispatch(setAccount(response));
      }
    });
  }, []);

  return (
    <Container>
      <SidebarContainer>
        <Optionbar />
      </SidebarContainer>

      <ContentContainer>{state.isViewingPost === false ? <Dashboard /> : <ViewPost />}</ContentContainer>

      <SidebarContainer></SidebarContainer>
    </Container>
  );
};
