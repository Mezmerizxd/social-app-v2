import styled from 'styled-components';
import theme from './styled/theme';

export const RouterContainer = styled.div`
  background: inherit;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const SelectionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Selection = styled.div`
  background: rgba(35, 35, 35, 0.2);
  box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 5px;
  border-radius: 6px;
`;

export const SelectionTitle = styled.div`
  text-align: center;
  font-family: 'Quicksand', sans-serif;

  h1 {
    font-weight: lighter;
    font-size: 3rem;
    color: ${theme.text.primary.hex};
  }
  p {
    font-weight: bold;
    font-size: 1rem;
    color: rgba(${theme.text.primary.rgb}, 0.6);
  }
  a {
    text-decoration: none;
  }
`;

export const SelectionOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SelectionOptions = styled.div`
  text-align: center;

  button {
    width: 100%;
    font-family: 'Quicksand', sans-serif;
    font-weight: normal;
    font-size: 1rem;
    color: black;
    background-color: ${theme.colors.white.hex};
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: rgb(230, 230, 230);
      color: rgb(25, 25, 25);
    }

    &:active {
      background-color: rgb(215, 215, 215);
      color: rgb(45, 45, 45);
    }
  }
`;

export const SelectionFooter = styled.div`
  text-align: center;

  p {
    font-family: 'Quicksand', sans-serif;
    font-weight: normal;
    font-size: 0.8rem;
    color: rgb(200, 200, 200);

    span {
      text-decoration: underline;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: rgb(225, 225, 225);
      }
    }
  }
`;
