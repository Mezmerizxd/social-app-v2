import styled from 'styled-components';

export const CreatePost = styled.div`
  padding: 10px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  textarea {
    width: calc(100% - 20px);
    resize: none;
    height: 20px;
    border: none;
    background: rgba(35, 35, 35, 0.2);
    box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
    color: white;
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1rem;
    outline: none;
    padding: 10px;
    transition: 0.2s;
    ::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  button {
    width: fit-content;
    height: 30px;
    margin-top: 10px;

    &:hover {
      background: rgba(220, 220, 220, 1);
    }
  }
`;
