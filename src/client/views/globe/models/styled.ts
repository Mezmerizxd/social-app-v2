import styled from 'styled-components';

export const Post = styled.div`
    width: calc(100% - 10px);
    background: rgba(35, 35, 35, 0.4);
    box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    flex-direction: row;
`;

export const PostSidebar = styled.div``;
export const PostSidebarAvatar = styled.div`
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 10px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`;

export const PostContentContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 480px;
    grid-template-rows: 0.1fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`;
export const PostHeader = styled.div`
    padding-top: 10px;
    padding-bottom: 5px;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export const PostHeaderDetails = styled.div`
    display: flex;
    flex-direction: row;
    h1 {
        color: white;
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
        font-size: 1rem;
        margin-right: 5px;
    }
    p {
        color: rgb(220, 220, 220);
        font-family: 'Quicksand', sans-serif;
        font-weight: lighter;
        font-size: 0.8rem;
    }
`;
export const PostHeaderOptions = styled.div`
    * {
        color: rgb(180, 180, 180);
    }
`;
export const PostContent = styled.div`
    overflow-wrap: break-word;
    p {
        color: rgb(240, 240, 240);
        font-family: 'Quicksand', sans-serif;
        font-weight: lighter;
        font-size: 1rem;
        word-wrap: break-word;
    }
`;
export const PostContentOptionsContainer = styled.div`
    display: flex;
`;
export const PostContentOption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin-right: 10px;
    cursor: pointer;

    p {
        margin-left: 5px;
        color: rgb(180, 180, 180);
        transition: 0.2s;
    }
    svg {
        width: 20px;
        height: 20px;
        color: rgb(180, 180, 180);
        transition: 0.2s;
    }
    &:hover {
        svg {
            color: rgb(220, 220, 220);
        }
        p {
            color: rgb(220, 220, 220);
        }
    }
`;
