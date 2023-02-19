import { createSlice } from '@reduxjs/toolkit';

export const InitialState: Client.Components.Notifications.Default.InitialState = {
  icon: '',
  message: 'New Friend Request',
  closable: true,
  open: true,
  wait: 0,
};

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: InitialState,
  reducers: {
    setNotification: (state, action) => {
      state.icon = action.payload.icon;
      state.message = action.payload.message;
      state.closable = action.payload.closable;
      state.open = true;
      state.wait = action.payload.wait;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { setNotification, close } = NotificationSlice.actions;

export default NotificationSlice.reducer;
