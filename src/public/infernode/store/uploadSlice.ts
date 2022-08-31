/* eslint no-param-reassign: 0 */
//* redux-toolkit uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Capture } from './interfaces';

export interface UploadState {
  file: string,
  capture: Capture;
  loading: boolean;
  progress: number;
}

const initialState: UploadState = {
  file: '',
  capture: {
    appName: '',
    id: 0,
    captureName: '',
    creator: '',
    date: '',
    data: '',
  },
  loading: false,
  progress: 0,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<string>) => {
      state.file = action.payload;
    },
    updateAppName: (state, action: PayloadAction<string>) => {
      state.capture.appName = action.payload;
    },
    updateCaptureName: (state, action: PayloadAction<string>) => {
      state.capture.captureName = action.payload;
    },
    updateCreator: (state, action: PayloadAction<string>) => {
      state.capture.creator = action.payload;
    },
    updateData: (state, action: PayloadAction<string>) => {
      state.capture.data = action.payload;
    },
    updateDate: (state, action: PayloadAction<string>) => {
      state.capture.date = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});

export const {
  setFile, updateAppName, updateCaptureName, updateCreator, updateData, updateDate, setLoading,
  setProgress,
} = uploadSlice.actions;
export default uploadSlice.reducer;
