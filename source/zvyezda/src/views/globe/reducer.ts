import { createSlice } from '@reduxjs/toolkit';

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
  isViewingPost: false,
  viewingLevel: 0,
  viewedPosts: [],
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
      if (action.payload?.justCreated === true) {
        state.posts.unshift(action.payload);
      } else {
        state.posts.push(action.payload);
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.postId !== action.payload.postId);
    },
    likePost: (state, action) => {
      let likedPosts: string[] = [];

      state.posts.map((post) => {
        if (post.postId === action.payload.postId) {
          if (post.likes.includes(action.payload.userId)) {
            post.likes = post.likes.filter((userId) => userId !== action.payload.userId);
          } else {
            post.likes.push(action.payload.userId);
          }
        }
      });

      state.data.likedPosts.map((postId) => {
        if (postId === action.payload.postId) {
          likedPosts = likedPosts.filter((postId) => postId !== action.payload.postId);
        } else {
          likedPosts.push(action.payload.postId);
        }
      });

      state.data.likedPosts = likedPosts;
    },
    viewPost: (state, action) => {
      state.viewedPosts.push(action.payload);
      state.viewingLevel++;
      state.isViewingPost = true;
    },
  },
});

export const { setAccount, handleCreatePostUi, addPost, handlePostOptionsUi, deletePost, likePost, viewPost } =
  GlobeSlice.actions;

export default GlobeSlice.reducer;
