export interface InitialDataProps {
    friends: any;
    messages: any;
    sidebar: {
        open: boolean;
        data: any;
    };
    addFriend: {
        error: any;
        open: boolean;
    };
}

export const InitialData: InitialDataProps = {
    friends: null,
    messages: null,
    sidebar: {
        open: true,
        data: null,
    },
    addFriend: {
        error: null,
        open: false,
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
                AddFriend: {
                    ...state.addFriend,
                    error: action.data.error,
                },
            };
    }
};
