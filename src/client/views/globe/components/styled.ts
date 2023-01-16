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
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0px;
    }
`;
