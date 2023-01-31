import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 560px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  border-left: 2px rgba(255, 255, 255, 0.116) solid;
  border-right: 2px rgba(255, 255, 255, 0.116) solid;
  grid-area: 1 / 2 / 2 / 3;
  overflow-y: hidden;
`;

export const SidebarContainer = styled.div``;
