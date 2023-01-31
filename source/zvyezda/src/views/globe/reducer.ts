import {createSlice} from '@reduxjs/toolkit';

export const InitialState: Client.Globe.InitialState = {
  account: {
    userId: 1,
    username: 'Mezmerizxd',
    email: 'test@test.com',
    avatar: 'https://avatars.githubusercontent.com/u/52637194',
    accountCreationDate: JSON.stringify(new Date()),
    authorization: 'null',
    verifiedEmail: true,
    verifiedUser: true,
    lastLoggedInDate: JSON.stringify(new Date()),
  },
  data: {
    likedPosts: [],
  },
  posts: [],
  createPost: {
    increment: 0,
    maxHeight: 10,
    value: '',
  },
  postOptions: {
    open: false,
    posX: 0,
    posY: 0,
    selectedPostId: 0,
    selectedPostUserId: 0,
    selectedPostUsername: '',
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
      state.createPost.value = action.payload.value ?? state.createPost.value;
      state.createPost.increment = action.payload.increment ?? state.createPost.increment;
      state.createPost.maxHeight = action.payload.maxHeight ?? state.createPost.maxHeight;
    },
    handlePostOptionsUi: (state, action) => {
      state.postOptions.open = action.payload.open;
      state.postOptions.posX = action.payload.posX;
      state.postOptions.posY = action.payload.posY;
      state.postOptions.selectedPostId = action.payload.selectedPostId;
      state.postOptions.selectedPostUserId = action.payload.selectedPostUserId;
      state.postOptions.selectedPostUsername = action.payload.selectedPostUsername;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.postId !== action.payload.postId);
    },
    likePost: (state, action) => {
      let likedPosts: any = [];
      state?.data?.likedPosts?.map((post) => {
        likedPosts.push(post);
      });
      if (likedPosts.includes(action.payload.postId)) {
        likedPosts = likedPosts.filter((postId) => postId !== action.payload.postId);
        state.posts.map((post) => {
          if (post.postId === action.payload.postId) {
            post.likes--;
            return;
          }
        });
      } else {
        likedPosts.push(action.payload.postId);
        state.posts.map((post) => {
          if (post.postId === action.payload.postId) {
            post.likes++;
            return;
          }
        });
      }
      state.data.likedPosts = likedPosts;
    },
  },
});

export const { setAccount, handleCreatePostUi, addPost, handlePostOptionsUi, deletePost, likePost } =
  GlobeSlice.actions;

export default GlobeSlice.reducer;
