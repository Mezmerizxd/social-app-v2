import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Card = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Verify = styled.div`
  background: rgba(35, 35, 35, 0.2);
  box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  max-width: 80%;

  h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 2rem;
    border-radius: 6px;
    color: white;
  }

  p {
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.2rem;
    border-radius: 6px;
    color: white;
    word-wrap: break-word;
  }

  span {
    color: rgb(255, 255, 255);
    font-weight: bold;
  }
`;
