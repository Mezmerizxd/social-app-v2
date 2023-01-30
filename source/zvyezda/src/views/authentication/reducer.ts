import { createSlice } from '@reduxjs/toolkit';

export const InitialState: Client.Authentication.InitialState = {
    context: 0,
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
