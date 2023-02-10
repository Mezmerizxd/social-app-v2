import { Sidebar, SidebarHeader, SidebarOption, SidebarOptions } from './styled';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';

export default () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>
          The Globe <span style={{ color: 'rgb(230, 10, 0)' }}>{'[DEV]'}</span>
        </h1>
      </SidebarHeader>
      <SidebarOptions>
        <SidebarOption onClick={() => (window.location.href = '/')}>
          <HomeIcon />
          <p>Home</p>
        </SidebarOption>
        <SidebarOption onClick={() => (window.location.href = '/messaging')}>
          <MessageIcon />
          <p>Messaging</p>
        </SidebarOption>
      </SidebarOptions>
    </Sidebar>
  );
};
