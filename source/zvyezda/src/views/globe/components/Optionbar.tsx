import { Sidebar, SidebarHeader, SidebarOption, SidebarOptions, SidebarProfile } from './styled';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';

export default () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>The Globe</h1>
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
      <SidebarProfile>
        <img src="https://cdn.discordapp.com/embed/avatars/1.png" />
        <p>zvyezda</p>
      </SidebarProfile>
    </Sidebar>
  );
};
