import { configureStore } from '@reduxjs/toolkit';
import AuthenticationSlice from './views/authentication/reducer';
import MessagingSlice from './views/messaging/reducer';
import GlobeSlice from './views/globe/reducer';
import NotificationSlice from './components/notifications/reducer';

export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
    messaging: MessagingSlice,
    globe: GlobeSlice,
    notification: NotificationSlice,
  },
});
