import styled from 'styled-components';

export const Sidebar = styled.div`
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: rgba(35, 35, 35, 0.2);
    box-shadow: 0px 0px 2px 0px rgba(35, 35, 35, 0.75);
`;

export const SidebarHeader = styled.div`
    width: 90%;
    margin: auto;
    padding: 10px;
    text-align: center;
    border-bottom: 2px rgba(255, 255, 255, 0.116) solid;
    * {
        user-select: none;
    }

    h1 {
        font-family: 'Quicksand', sans-serif;
        font-weight: lighter;
        font-size: 2rem;
        color: white;
    }
`;
