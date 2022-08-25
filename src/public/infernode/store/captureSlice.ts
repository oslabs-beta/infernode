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

export const updateCapture = createAsyncThunk<void, Capture>(
  'captures/updateOne',
  async (capture: Capture) => {
    await captures.putOne(capture);
  },
);

export const deleteCapture = createAsyncThunk<void, number>(
  'captures/deleteOne',
  async (id: number) => {
    await captures.deleteOne(id);
  },
);

export const captureSlice = createSlice({
  name: 'captures',
  initialState,
  reducers: {
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
    builder.addCase(updateCapture.fulfilled, (_state, action) => {
      console.log('fulfilled', JSON.stringify(action));
      fetchAllCaptures();
    });
    builder.addCase(updateCapture.rejected, (_state, action) => {
      console.log('REJECTED', JSON.stringify(action));
      console.log('updateCapture resolved to error: ', action.payload || action.error);
    });
    builder.addCase(deleteCapture.fulfilled, (_state, action) => {
      console.log('fulfilled', JSON.stringify(action));
      fetchAllCaptures();
    });
    builder.addCase(deleteCapture.rejected, (_state, action) => {
      console.log('REJECTED', JSON.stringify(action));
      console.log('deleteCapture resolved to error: ', action.payload || action.error);
    });
  },
});

export const { setCurrent } = captureSlice.actions;
export default captureSlice.reducer;
