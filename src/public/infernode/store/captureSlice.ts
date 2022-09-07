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
  comparison: (number | null)[];
}

const initialState: CaptureState = {
  captureList: [],
  current: null,
  loading: false,
  comparison: [],
};

export const getComparisonCapture = createAsyncThunk(
  'captures/getComparionCapture',
  async (comparison: (number | null)[]) => {
    console.log('comparison id is ', comparison);
    const id = Number(await fetch('/api/diff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id1: comparison[0],
        id2: comparison[1],
      }),
    }).then((res) => res.json()).catch((err) => console.error(err)));
    console.log('compare capture id is ', id);
    return id;
  },
);

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

export const deleteCapture = createAsyncThunk<void, Capture>(
  'captures/deleteOne',
  async (capture: Capture) => {
    await captures.deleteOne(capture);
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setComparison: (state, action: PayloadAction<number | null>) => {
      console.log('setComparion invoked ', state.comparison, ' is comaprison value');
      // Differentials page initilization
      if (!action.payload) state.comparison = [];
      // Compare two flamegraphs
      else state.comparison.push(action.payload);
      console.log('setComparions executed ', state.comparison, ' is comaprison value');
    },
    removeComparison: (state, action: PayloadAction<number>) => {
      console.log('removeComparion invoked ', state.comparison, ' is comaprison value');
      state.comparison = state.comparison.filter((element) => element !== action.payload);
      console.log('removeComparions executed ', state.comparison, ' is comaprison value');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCaptures.fulfilled, (state, action) => {
      console.log('fulfilled', JSON.stringify(action));
      state.captureList = action.payload;
      if (state.captureList.length > 0) {
        state.current = state.captureList[state.captureList.length - 1].id;
      } else {
        state.current = null;
      }
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
    builder.addCase(getComparisonCapture.fulfilled, (state, action) => {
      console.log('fullfulled', JSON.stringify(action));
      state.current = action.payload;
    });
    builder.addCase(getComparisonCapture.rejected, (state, action) => {
      console.log('rejected', JSON.stringify(action));
      console.log('getComparisonCapture resolved to error: ', action.payload || action.error);
    });
  },
});

export const {
  setCurrent, setLoading, setComparison, removeComparison,
} = captureSlice.actions;
export default captureSlice.reducer;
