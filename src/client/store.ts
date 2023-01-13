import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './views/authentication/reducer';
import MessagingSlice from './views/messaging/reducer';

export const store = configureStore({
    reducer: {
        authentication: AuthenticationSlice,
        messaging: MessagingSlice,
    },
});
