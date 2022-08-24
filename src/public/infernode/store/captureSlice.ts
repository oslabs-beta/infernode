/* eslint-disable no-console */
/* eslint no-param-reassign: 0 */
//* redux-toolkit uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Capture } from './interfaces';
import captures from '../services/captureService';

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

export const fetchAllCaptures = createAsyncThunk<Capture[]>(
  'captures/fetchAll',
  async () => {
    const result = await captures.getAll();
    return result;
  },
);

export const captureSlice = createSlice({
  name: 'captures',
  initialState,
  reducers: {
    addCapture: (state, action: PayloadAction<Capture>) => {
      state.captureList.push(action.payload);
    },
    deleteCapture: (state, action: PayloadAction<number>) => {
      state.captureList = state.captureList.filter(
        (capture) => capture.id !== action.payload,
      );
    },
    setCaptures: (state, action: PayloadAction<Capture[]>) => {
      state.captureList = action.payload;
    },
    setCurrent: (state, action: PayloadAction<number | null>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCaptures.fulfilled, (state, action) => {
      console.log('fulfilled', JSON.stringify(action));
      state.captureList = action.payload;
    });
    builder.addCase(fetchAllCaptures.rejected, (state, action) => {
      console.log('REJECTED', JSON.stringify(action));
      console.log('fetchAllCaptures resolved to error: ', action.payload || action.error);
      state.captureList = [];
    });
  },
});

export const { addCapture, deleteCapture, setCurrent } = captureSlice.actions;
export default captureSlice.reducer;
