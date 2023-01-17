import { createSlice } from '@reduxjs/toolkit';

export const InitialState: Client.Globe.InitialState = {
    account: {
        userId: 1,
        username: 'Mezmerizxd',
        email: 'test@test.com',
        avatar: 'https://avatars.githubusercontent.com/u/52637194',
    },
    posts: [
        {
            postId: 1,
            userId: 1,
            username: 'Mezmerizxd',
            avatar: 'https://avatars.githubusercontent.com/u/52637194',
            content: 'Hello world!',
            datePosted: JSON.stringify(new Date()),
            likes: 0,
            comments: 0,
        },
    ],
    createPost: {
        increment: 0,
        maxHeight: 10,
        value: '',
    },
};

export const GlobeSlice = createSlice({
    name: 'globe',
    initialState: InitialState,
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        handleCreatePostUi: (state, action) => {
            state.createPost.value =
                action.payload.value ?? state.createPost.value;
            state.createPost.increment =
                action.payload.increment ?? state.createPost.increment;
            state.createPost.maxHeight =
                action.payload.maxHeight ?? state.createPost.maxHeight;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
    },
});

export const { setAccount, handleCreatePostUi, addPost } = GlobeSlice.actions;

export default GlobeSlice.reducer;
