/* eslint no-param-reassign: 0 */
//* redux-toolkit uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

/*
  let createTableSQL = 'CREATE TABLE capture(id INT NOT NULL, capture_name TEXT NOT ';
  createTableSQL += 'NULL, date, creator TEXT NOT NULL, app_name TEXT NOT NULL, data';
  createTableSQL += ' TEXT NOT NULL)';
  */
export interface Capture {
  id: number;
  captureName: string;
  date: Date;
  creator: string;
  appName: string;
  data: string;
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
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

export const { addCapture, deleteCapture, setCurrent } = captureSlice.actions;
export default captureSlice.reducer;
