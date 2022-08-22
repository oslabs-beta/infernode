/* eslint no-param-reassign: 0 */
//* redux-toolkit uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Capture {
  id: number;
  captureName: string;
  date: Date;
  creator: string;
  appName: string;
  data: string;
  saved: boolean;
}

export interface CaptureState {
  captureList: Capture[];
  current: number | null;
  loading: boolean;
}

const initialState: CaptureState = {
  captureList: [],
  current: null,
  loading: false,
};

export const captureSlice = createSlice({
  name: 'captures',
  initialState,
  reducers: {
    addCapture: (state, action: PayloadAction<Capture>) => {
      state.captureList.push(action.payload);
    },
    deleteCapture: (state, action: PayloadAction<number>) => {
      state.captureList = state.captureList.filter((capture) => capture.id !== action.payload);
    },
  },
});

export const { addCapture, deleteCapture } = captureSlice.actions;
export default captureSlice.reducer;
