import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateProps {
    context: string;
}

export const InitialState: InitialStateProps = {
    context: '',
};

export const AuthenticationSlice = createSlice({
    name: 'auth',
    initialState: InitialState,
    reducers: {
        setContext: (state, action) => {
            state.context = action.payload;
        },
    },
});

export const { setContext } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
