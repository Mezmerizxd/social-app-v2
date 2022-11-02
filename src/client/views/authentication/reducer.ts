export interface InitialDataProps {
    login: {
        email: string;
        password: string;
    };
    signup: {
        email: string;
        username: string;
        password: string;
    };
    context: string;
}

export const InitialData: InitialDataProps = {
    login: {
        email: '',
        password: '',
    },
    signup: {
        email: '',
        username: '',
        password: '',
    },
    context: '',
};

export const Reducer = (state: InitialDataProps, action: any) => {
    switch (action.type) {
        case 'SET_CONTEXT':
            return {
                ...state,
                context: action.data.context,
            };
        case 'SET_LOGIN_EMAIL':
            return {
                ...state,
                login: {
                    ...state.login,
                    email: action.data.email,
                },
            };
        case 'SET_LOGIN_PASSWORD':
            return {
                ...state,
                login: {
                    ...state.login,
                    password: action.data.password,
                },
            };
        case 'SET_SIGNUP_EMAIL':
            return {
                ...state,
                signup: {
                    ...state.signup,
                    email: action.data.email,
                },
            };
        case 'SET_SIGNUP_USERNAME':
            return {
                ...state,
                signup: {
                    ...state.signup,
                    username: action.data.username,
                },
            };
        case 'SET_SIGNUP_PASSWORD':
            return {
                ...state,
                signup: {
                    ...state.signup,
                    password: action.data.password,
                },
            };
    }
};
