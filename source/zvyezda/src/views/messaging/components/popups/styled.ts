import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(1, 1, 1, 0.5);
    backdrop-filter: blur(1.75px);
    -webkit-backdrop-filter: blur(1.75px);
    height: 100%;
    width: 100%;
`;

export const Popup = styled.div`
    background: rgba(35, 35, 35, 0.8);
    box-shadow: 0px 0px 2px 0px rgba(100, 100, 100, 0.75);
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    width: 80%;
    max-width: 300px;
    min-width: 200px;
    border-radius: 6px;
`;

export const PopupTitle = styled.div`
    text-align: center;
    font-size: smaller;

    h1 {
        font-family: 'Quicksand', sans-serif;
        font-weight: lighter;
        font-size: 1.5rem;
        color: white;
    }
`;

export const PopupContent = styled.div`
    p {
        font-family: 'Quicksand', sans-serif;
        text-align: center;
        color: white;
        font-size: 1.2rem;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

export const PopupTabbar = styled.div`
    background: rgb(25, 25, 25);
    margin-top: 5px;
    border-radius: 6px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    #tab_selected {
        background: rgba(40, 40, 40, 1);
    }
`;
export const PopupTabbarTab = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(25, 25, 25);
    width: 100%;
    margin: 5px;
    border-radius: 6px;
    text-align: center;
    color: white;
    transition: 0.2s;
    cursor: pointer;

    svg {
        width: 18px;
    }

    &:hover {
        background: rgba(38, 38, 38, 1);
        color: rgb(200, 200, 200);
    }
`;

export const PopupFriendRequests = styled.div`
    overflow-y: auto;
    max-height: 400px;
    margin-top: 10px;
    margin-bottom: 10px;
`;
export const PopupFriendRequestsRequest = styled.div`
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    font-size: 1.1rem;
    display: flex;
    margin-bottom: 10px;
    margin-right: 5px;
    height: 40px;
    background: rgba(50, 50, 50, 1);
    box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
    transition: 0.2s;
    border-radius: 6px;
    width: calc(100% - 5px);

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
        width: 100%;
    }
`;
export const PopupFriendRequestsRequestActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 5px;

    #decline {
        color: #dc6651;
        transition: 0.2s;
        cursor: pointer;
        margin-right: 5px;
        &:hover {
            color: #c65b48;
        }
    }
    #accept {
        color: #63b84e;
        transition: 0.2s;
        cursor: pointer;
        &:hover {
            color: #58a345;
        }
    }
`;
export const PopupFriendRequestsNotFound = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px;
    p {
        color: white;
        font-family: 'Quicksand', sans-serif;
        font-weight: lighter;
        font-size: 1.1rem;
    }
`;

export const PopupError = styled.div`
    text-align: center;
    margin-top: 10px;
    padding: 5px;
    background-color: #dc6651;
    border-radius: 6px;

    p {
        font-family: 'Quicksand', sans-serif;
        font-size: small;
        color: white;
        text-align: center;
    }
`;

export const PopupActions = styled.div`
    width: 100%;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;

    #close {
        width: 100%;
        margin-right: 50px;
        background-color: #ed7461;
        color: white;
        &:hover {
            background-color: #df6c5b;
        }
    }
    #send {
        width: 100%;
        margin-left: 50px;
        background-color: #68c551;
        color: white;
        &:hover {
            background-color: #63b84e;
        }
    }
`;

export const PopupActionsCenter = styled.div`
    text-align: center;
    margin-bottom: 10px;
    #close {
        background-color: #68c551;
        color: white;
    }
`;

export const PopupSettingsContent = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;

    #username-error {
        text-align: center;
        margin-top: 10px;
        padding: 5px;
        background-color: #dc6651;
        border-radius: 6px;
        font-family: 'Quicksand', sans-serif;
        font-size: medium;
        color: white;
        text-align: center;
    }
`;
export const PopupSettingsContentProfile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px rgba(255, 255, 255, 0.4) solid;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 6px;

    img {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 100%;
        width: 50px;
        margin-right: 10px;
    }

    i {
        display: flex;
        flex-direction: column;
        justify-content: center;
        svg {
            margin-left: 10px;
            padding: 5px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            transition: 0.2s;
            color: white;
        }
    }
`;
export const PopupSettingsContentProfileImage = styled.div`
    width: auto;
    height: auto;
    svg {
        position: absolute;
        margin-left: 35px;
        width: 16px;
        height: 16px;
        padding: 3px;
        border-radius: 50%;
        color: white;
        cursor: pointer;
    }
`;
export const PopupSettingsContentAccount = styled.div`
    margin-top: 10px;
`;
