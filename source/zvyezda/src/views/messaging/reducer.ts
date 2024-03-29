import { createSlice } from '@reduxjs/toolkit';

export const InitialState: Client.Messaging.InitialState = {
  error: null,
  user: {
    userId: null,
    username: null,
    email: null,
    avatar: null,
  },
  friends: null,
  messages: null,
  selectedMessage: {
    isHovering: false,
    messageId: null,
    message: '',
  },
  selectedFriend: {
    userId: null,
    username: null,
    messagesGroupId: null,
  },
  sidebar: {
    open: true,
  },
  addFriendPopup: {
    open: false,
  },
  friendRequestsPopup: {
    open: false,
    sent: null,
    received: null,
    error: null,
  },
  settingsPopup: {
    open: false,
  },
  deleteMessagePopup: {
    open: false,
  },
  editMessagePopup: {
    open: false,
  },
};

export const MessagingSlice = createSlice({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserData: (state, action) => {
      state.user.userId = action.payload.userId;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.avatar = action.payload.avatar;
      state.friends = action.payload.friends;
    },
    editUserData: (state, action) => {
      state.user.userId = action.payload.userId ? action.payload.userId : state.user.userId;
      state.user.username = action.payload.username ? action.payload.username : state.user.username;
      state.user.email = action.payload.email ? action.payload.email : state.user.email;
      state.user.avatar = action.payload.avatar ? action.payload.avatar : state.user.avatar;
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      if (state.friends) {
        state.friends.push({
          userId: action.payload.userId,
          username: action.payload.username,
          avatar: action.payload.avatar,
        });
      } else {
        state.friends = [
          {
            userId: action.payload.userId,
            username: action.payload.username,
            avatar: action.payload.avatar,
          },
        ];
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
      state.selectedFriend.userId = action.payload.userId;
      state.selectedFriend.username = action.payload.username;
      state.selectedFriend.messagesGroupId = action.payload.messagesGroupId;
    },
    setSelectedMessage: (state, action) => {
      state.selectedMessage.isHovering = action.payload.isHovering;
      state.selectedMessage.messageId = action.payload.messageId
        ? action.payload.messageId
        : state.selectedMessage.messageId;
      state.selectedMessage.message = action.payload.content ? action.payload.content : state.selectedMessage.message;
    },
    addMessage: (state, action) => {
      state.messages.push({
        messageId: action.payload.messageId,
        userId: action.payload.userId,
        username: action.payload.username,
        avatar: action.payload.avatar,
        message: action.payload.message,
        createdAt: action.payload.createdAt,
      });
    },
    toggleSidebar: (state) => {
      state.sidebar.open = !state.sidebar.open;
    },
    toggleAddFriendPopup: (state) => {
      state.addFriendPopup.open = !state.addFriendPopup.open;
    },
    toggleFriendRequestsPopup: (state) => {
      state.friendRequestsPopup.open = !state.friendRequestsPopup.open;
    },
    setFriendRequestsPopupData: (state, action) => {
      state.friendRequestsPopup.sent = action.payload.sent;
      state.friendRequestsPopup.received = action.payload.received;
    },
    rmFriendRequestsPopupRequest: (state, action) => {
      const sent: any = [];
      const received: any = [];
      state?.friendRequestsPopup?.sent?.map((user) => {
        if (user.userId !== action.payload) sent.push(user.userId);
      });
      state?.friendRequestsPopup?.received?.map((user) => {
        if (user.userId !== action.payload) sent.push(user.userId);
      });
      state.friendRequestsPopup.sent = sent;
      state.friendRequestsPopup.received = received;
    },
    toggleSettingsPopup: (state) => {
      state.settingsPopup.open = !state.settingsPopup.open;
    },
    toggleDeleteMessagePopup: (state) => {
      state.deleteMessagePopup.open = !state.deleteMessagePopup.open;
    },
    rmMessage: (state) => {
      const messages: any = [];
      state?.messages?.map((message) => {
        if (message.messageId !== state.selectedMessage.messageId) messages.push(message);
      });
      state.messages = messages;
    },
    toggleEditMessagePopup: (state) => {
      state.editMessagePopup.open = !state.editMessagePopup.open;
    },
    editMessage: (state, action) => {
      state.messages.filter((message) => {
        if (message.messageId === state.selectedMessage.messageId) {
          message.message = action.payload.message;
        }
      });
    },
  },
});

export const {
  setError,
  setUserData,
  editUserData,
  setFriends,
  addFriend,
  setSelectedMessage,
  toggleAddFriendPopup,
  setFriendRequestsPopupData,
  toggleFriendRequestsPopup,
  rmFriendRequestsPopupRequest,
  toggleSidebar,
  toggleSettingsPopup,
  setMessages,
  addMessage,
  toggleDeleteMessagePopup,
  rmMessage,
  toggleEditMessagePopup,
  editMessage,
} = MessagingSlice.actions;

export default MessagingSlice.reducer;
