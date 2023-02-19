import styled from 'styled-components';

// Default alert
export const DefaultContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  max-width: 400px;
  z-index: 1000;
  padding: 10px;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);

  animation: alert 0.5s ease-in-out;
  @keyframes alert {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Default = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DefaultIcon = styled.div`
  display: flex;
  margin-right: 10px;
  svg {
    color: #fff;
  }
`;

export const DefaultMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const DefaultClose = styled.div`
  display: flex;
  margin-left: 10px;
  cursor: pointer;

  svg {
    color: #ff5d5d;
  }

  &:hover {
    // small blur background
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 4px;

    svg {
      color: #ff3d3d;
    }
  }
`;
