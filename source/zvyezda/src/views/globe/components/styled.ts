import styled from 'styled-components';

// Sidebar
export const Sidebar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  overflow-y: hidden;
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
  justify-content: flex-start;
  align-items: center;

  padding-top: 10px;
`;
export const SidebarOption = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  transition: 0.2s;

  svg {
    color: white;
    margin-right: 10px;
    width: 1.8rem;
    height: 1.8rem;
    transition: 0.2s;
    padding-left: 20px;
  }
  p {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.2rem;
    color: white;
    transition: 0.2s;
    padding-right: 20px;
  }

  :hover {
    background: rgba(255, 255, 255, 0.116);
    svg {
      color: rgba(255, 255, 255, 0.8);
    }
    p {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;
export const SidebarProfile = styled.div`
  width: calc(100% - 30px);
  // in a grid, a cirle profile picture on the left and username on the right
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.116);
  cursor: pointer;
  transition: 0.2s;

  * {
    user-select: none;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  p {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.2rem;
    color: white;
    padding-right: 20px;
    margin: auto;
  }

  :hover {
    background: rgba(255, 255, 255, 0.2);
    p {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

// Dashboard
export const Dashboard = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  overflow-y: hidden;
`;
export const DashboardCreatePostContainer = styled.div`
  border-bottom: 2px rgba(255, 255, 255, 0.116) solid;
`;
export const DashboardPostsContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

// ViewPost
export const ViewPost = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  overflow-y: hidden;
`;
export const ViewPostPost = styled.div``;
export const ViewPostReply = styled.div``;
export const ViewPostReplies = styled.div``;

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
