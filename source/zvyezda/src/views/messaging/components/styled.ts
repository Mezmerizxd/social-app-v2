import styled from 'styled-components';

// Sidebar
export const SidebarContainer = styled.div`
  height: 100%;
  width: 300px;
  overflow: hidden;
  user-select: none;
  transition: 0.4s;

  @media (max-width: 450px) {
    position: absolute;
    width: 100%;
  }
`;
export const SidebarTitle = styled.div`
  background: rgba(35, 35, 35, 0.4);
  box-shadow: -5px 0px 2px 0px rgba(35, 35, 35, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;

  h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.2rem;
    color: white;
  }

  #add {
    left: 0;
  }
  #arrow {
    margin-left: 125px;
  }
`;
export const SidebarContent = styled.div`
  height: calc(100% - 50px);
`;
export const SidebarFriendslist = styled.div`
  overflow-y: auto;
  height: calc(100% - 30px);
  border-right: 1px rgba(255, 255, 255, 0.116) solid;
  padding-right: 5px;
  padding-left: 5px;
`;
export const SidebarFriend = styled.div`
  font-family: 'Quicksand', sans-serif;
  font-weight: lighter;
  font-size: 1.1rem;
  display: flex;
  padding-left: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 50px;
  box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
  cursor: pointer;
  transition: 0.2s;
  border-radius: 6px;

  img {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 100%;
  }

  p {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 4px;
    padding-left: 5px;
    word-break: keep-all;
    overflow: hidden;
  }

  &:hover {
    background: rgba(35, 35, 35, 0.6);
  }
  &:active {
    background: rgba(35, 35, 35, 0.5);
  }
`;
export const SidebarFriendslistNoFriends = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.2rem;
    color: white;
  }
`;
export const SidebarActionbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  background: rgba(35, 35, 35, 0.4);
  box-shadow: -5px 0px 2px 0px rgba(35, 35, 35, 0.75);

  svg {
    position: relative;
  }
  p {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1rem;
    color: rgb(157, 255, 0);
    margin-left: 5px;
    overflow-x: hidden;
    width: calc(100% - 100px);
  }
`;

// Messages
export const MessagesContainer = styled.div`
  position: absolute;
  right: 0;
  width: calc(100% - 300px);
  height: calc(100% - 120px);
  user-select: none;
  transition: 0.4s;
`;
export const MessagesTitlebar = styled.div`
  background: rgba(35, 35, 35, 0.4);
  box-shadow: 5px 0px 2px 0px rgba(35, 35, 35, 0.75);
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 40px;

  h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.2rem;
    color: white;
    width: 100%;
  }
`;
export const MessagesMessages = styled.div`
  background: rgba(35, 35, 35, 0.4);
  box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
  margin: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100%;
  overflow-y: auto;
  border-radius: 6px;

  #option {
    position: relative;
    background: none;
    margin: 0;
    padding: 0;
    margin-right: 10px;
  }
`;
export const MessagesMessagesNoMessages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  h1 {
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.2rem;
    color: white;
  }
`;
export const MessagesMessagesMessage = styled.div`
  word-wrap: break-word;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  font-family: 'Quicksand', sans-serif;
  border-radius: 6px;
  max-width: 100%;
  width: fit-content;
  padding-top: 5px;
  padding-bottom: 5px;
`;
export const MessagesMessagesMessageAvatar = styled.div`
  img {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 50%;
    height: 50px;
  }
`;
export const MessagesMessagesMessageContent = styled.div`
  max-width: calc(100% - 60px);

  p {
    padding-left: 10px;
    height: 100%;
    word-wrap: break-word;
  }

  #message {
    color: rgba(255, 255, 255, 0.8);
    padding-top: 5px;
    font-weight: lighter;
    font-size: 1rem;
    user-select: text;
    padding-right: 10px;
    word-wrap: break-word;
    max-width: calc(100% - 20px);
    width: fit-content;
  }
`;
export const MessagesMessagesMessageContentDetails = styled.div`
  display: flex;
  #username {
    font-size: large;
    color: rgb(157, 255, 0);
  }
  #date {
    font-size: smaller;
    color: rgba(255, 255, 255, 0.667);
    padding-top: 3px;
    padding-right: 10px;
  }
`;
export const MessagesInput = styled.div`
  width: calc(100% - 40px);
  margin-left: 10px;

  input {
    background: rgba(35, 35, 35, 0.4);
    border: none;
    outline: none;
    height: 30px;
    width: 100%;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 10px;
    color: white;
  }
`;
