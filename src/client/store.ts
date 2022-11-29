import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './views/authentication/reducer';
import ApplicationSlice from './views/application/reducer';

export const store = configureStore({
    reducer: {
        authentication: AuthenticationSlice,
        application: ApplicationSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
