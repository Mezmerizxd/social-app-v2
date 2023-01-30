import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
`;

export const MessagingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    svg {
        background: rgba(35, 35, 35, 0.6);
        position: absolute;
        color: white;
        cursor: pointer;
        transition: 0.2s;
        margin-left: 5px;
        margin-right: 5px;
        padding: 5px;
        width: 20px;
        height: 20px;
        border-radius: 6px;

        &:hover {
            color: rgb(215, 215, 215);
        }
        &:active {
            color: rgb(245, 245, 245);
        }
    }
`;

export const MessagignError = styled.div`
    text-align: center;
    h1 {
        font-family: 'Quicksand', sans-serif;
        font-weight: lighter;
        font-size: 2rem;
        color: white;
    }
    p {
        font-family: 'Quicksand', sans-serif;
        font-weight: lighter;
        font-size: 1.2rem;
        color: white;
    }
`;
