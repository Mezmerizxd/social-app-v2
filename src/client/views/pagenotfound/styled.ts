import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const Card = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        background: rgba(35, 35, 35, 0.2);
        box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-family: 'Quicksand', sans-serif;
        font-weight: lighter;
        font-size: 2rem;
        border-radius: 6px;
        color: white;
    }
`;
