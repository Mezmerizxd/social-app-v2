import styled from 'styled-components';

// Sidebar
export const Sidebar = styled.div`
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background: rgba(35, 35, 35, 0.2);
  box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
`;
export const SidebarHeader = styled.div`
  width: 90%;
  margin: auto;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 2px rgba(255, 255, 255, 0.116) solid;
  * {
    user-select: none;
  }
  h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 2rem;
    color: white;
  }
`;
export const SidebarOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;
export const SidebarOption = styled.div`
  width: 130px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  svg {
    color: white;
    margin-right: 10px;
    width: 30px;
    height: 30px;
    transition: 0.2s;
  }
  p {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.2rem;
    color: white;
    transition: 0.2s;
  }

  :hover {
    svg {
      color: rgba(255, 255, 255, 0.8);
    }
    p {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

// Content
export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  overflow-y: hidden;
`;
export const ContentCreatePostContainer = styled.div`
  border-bottom: 2px rgba(255, 255, 255, 0.116) solid;
`;
export const ContentPostsContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

// Post Options
export const PostOptionsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;
export const PostOptions = styled.div`
  background: rgba(35, 35, 35, 0.8);
  box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
  position: absolute;
  transition: 0.2s;
  width: 200px;
  height: fit-content;
`;
export const PostOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  color: white;
  font-family: 'Quicksand', sans-serif;
  font-weight: lighter;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    background: rgba(255, 255, 255, 0.116);
  }
  svg {
    margin-right: 10px;
  }
`;
