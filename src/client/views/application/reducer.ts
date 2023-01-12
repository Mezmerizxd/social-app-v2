import { createSlice } from '@reduxjs/toolkit';

export const InitialState: Client.Application.InitialState = {
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
        content: null,
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

export const ApplicationSlice = createSlice({
    name: 'auth',
    initialState: InitialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUserData: (state, action) => {
            state.user = action.payload;
        },
        editUserData: (state, action) => {
            state.user.userId = action.payload.userId
                ? action.payload.userId
                : state.user.userId;
            state.user.username = action.payload.username
                ? action.payload.username
                : state.user.username;
            state.user.email = action.payload.email
                ? action.payload.email
                : state.user.email;
            state.user.avatar = action.payload.avatar
                ? action.payload.avatar
                : state.user.avatar;
        },
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload.messages;
            state.selectedFriend.userId = action.payload.userId;
            state.selectedFriend.username = action.payload.username;
            state.selectedFriend.messagesGroupId =
                action.payload.messagesGroupId;
        },
        setSelectedMessage: (state, action) => {
            state.selectedMessage.isHovering = action.payload.isHovering;
            state.selectedMessage.messageId = action.payload.messageId
                ? action.payload.messageId
                : state.selectedMessage.messageId;
            state.selectedMessage.content = action.payload.content
                ? action.payload.content
                : state.selectedMessage.content;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
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
                if (message.messageId !== state.selectedMessage.messageId)
                    messages.push(message);
            });
            state.messages = messages;
        },
        toggleEditMessagePopup: (state) => {
            state.editMessagePopup.open = !state.editMessagePopup.open;
        },
        editMessage: (state, action) => {
            state.messages.filter((message) => {
                if (message.messageId === state.selectedMessage.messageId) {
                    message.content = action.payload.content;
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
} = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
