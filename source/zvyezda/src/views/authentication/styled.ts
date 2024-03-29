import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContextContainer = styled.div`
  background: rgba(35, 35, 35, 0.2);
  box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 5px;
  margin: 20px;
  max-width: 500px;
  text-align: center;
  border-radius: 6px;

  h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 2rem;
    color: white;
    width: 100%;
  }
  label,
  input {
    font-family: 'Quicksand', sans-serif;
    font-weight: normal;
  }

  button {
    font-family: 'Quicksand', sans-serif;
    font-weight: normal;
    font-size: 1rem;
    color: black;
    background-color: white;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    text-transform: capitalize;

    &:hover {
      background-color: rgb(230, 230, 230);
      color: rgb(25, 25, 25);
    }
  }

  p {
    font-family: 'Quicksand', sans-serif;
    font-weight: normal;
    font-size: 1rem;
    color: rgb(200, 200, 200);
    text-decoration: underline;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: rgb(230, 230, 230);
    }

    &:active {
      color: white;
    }
  }

  #error {
    text-decoration: none;
    background-color: rgb(247, 115, 115);
    padding: 5px;
    color: white;
    font-weight: bold;
    cursor: auto;
    border-radius: 6px;
  }
`;

export const ContextTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    position: absolute;
    color: white;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: rgb(222, 222, 222);
    }
  }
`;
