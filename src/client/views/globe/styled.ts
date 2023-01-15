import styled from 'styled-components';
import theme from '../../styled/theme';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1.4fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`;

export const ContentContainer = styled.div`
    border-left: 2px rgba(255, 255, 255, 0.116) solid;
    border-right: 2px rgba(255, 255, 255, 0.116) solid;
    grid-area: 1 / 2 / 2 / 3;
    overflow-y: hidden;
`;

export const SidebarContainer = styled.div``;
