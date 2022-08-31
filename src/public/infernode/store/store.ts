import { configureStore } from '@reduxjs/toolkit';
import configReducer from './configSlice';
import captureReducer from './captureSlice';
import userReducer from './userSlice';
import appReducer from './appSlice';
import uploadReducer from './uploadSlice';

export const store = configureStore({
  reducer: {
    config: configReducer,
    captures: captureReducer,
    user: userReducer,
    app: appReducer,
    upload: uploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
