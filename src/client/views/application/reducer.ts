import { InitialDataProps } from './types';

export const InitialData: InitialDataProps = {
    friends: null,
    selectedFriend: null,
    messages: null,
    sidebar: {
        open: true,
        data: null,
    },
    addFriend: {
        open: false,
    },
    friendRequests: {
        open: false,
        error: null,
        sent: null,
        received: null,
    },
    settings: {
        open: false,
        username: null,
        userId: null,
        email: null,
        avatar: null,
    },
};

export const Reducer = (state: InitialDataProps, action: any) => {
    switch (action.type) {
        case 'SET_SIDEBAR_OPEN':
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    open: action.data.open,
                },
            };
        case 'SET_FRIENDS':
            return {
                ...state,
                friends: action.data.friends,
            };
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.data.messages,
                selectedFriend: {
                    userId: action.data.userId,
                    username: action.data.username,
                },
            };
        case 'SET_ADDFRIEND':
            return {
                ...state,
                addFriend: {
                    ...state.addFriend,
                    open: action.data.open,
                },
            };
        case 'SET_ADDFRIEND_ERROR':
            return {
                ...state,
                addFriend: {
                    ...state.addFriend,
                    error: action.data.error,
                },
            };
        case 'SET_FRIEND_REQUESTS':
            return {
                ...state,
                friendRequests: {
                    ...state.friendRequests,
                    open: action.data.open,
                },
            };
        case 'SET_FRIEND_REQUESTS_DATA':
            return {
                ...state,
                friendRequests: {
                    ...state.friendRequests,
                    sent: action.data.sent,
                    received: action.data.received,
                },
            };
        case 'FRIEND_REQUESTS_REMOVE':
            return {
                ...state,
                friendRequests: {
                    ...state.friendRequests,
                    sent: state?.friendRequests?.sent?.filter(
                        (user) => user.userId !== action.data.userId
                    ),
                    received: state?.friendRequests?.received?.filter(
                        (user) => user.userId !== action.data.userId
                    ),
                },
            };
        case 'SET_SETTINGS':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    open: action.data.open,
                },
            };
        case 'SET_SETTINGS_DATA':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    username: action.data.username,
                    userId: action.data.userId,
                    email: action.data.email,
                    avatar: action.data.avatar,
                },
            };
    }
};
