import { Sidebar, SidebarHeader } from './styled';

export default () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <h1>
                    The Globe{' '}
                    <span style={{ color: 'rgb(230, 10, 0)' }}>{'[DEV]'}</span>
                </h1>
            </SidebarHeader>
        </Sidebar>
    );
};
