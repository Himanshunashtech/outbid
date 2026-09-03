import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import outbidReducer from './outbidSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    outbid: outbidReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
