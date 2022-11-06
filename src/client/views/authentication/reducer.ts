export interface InitialDataProps {
    login: {
        email: string;
        password: string;
        error: string;
    };
    signup: {
        email: string;
        username: string;
        password: string;
        error: string;
    };
    context: string;
}

export const InitialData: InitialDataProps = {
    login: {
        email: '',
        password: '',
        error: '',
    },
    signup: {
        email: '',
        username: '',
        password: '',
        error: '',
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
        case 'SET_LOGIN_ERROR':
            return {
                ...state,
                login: {
                    ...state.login,
                    error: action.data.error,
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
        case 'SET_SIGNUP_ERROR':
            return {
                ...state,
                signup: {
                    ...state.signup,
                    error: action.data.error,
                },
            };
    }
};
