import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './views/authentication/reducer';
import ApplicationSlice from './views/application/reducer';

export const store = configureStore({
    reducer: {
        authentication: AuthenticationSlice,
        application: ApplicationSlice,
    },
});
