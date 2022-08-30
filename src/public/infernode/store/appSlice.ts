/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppSliceStateType {
  isAppRuninng: boolean,
  isAppCapturing: boolean,
  duration: number | null,
  appName: string | null,
  relativePath: string | null,
}
interface StartAppPayloadType {
  appName: string;
  relativePath: string;
}

const checkIsAppRunning = createAsyncThunk<void, >(
    'app/checkIsApp'
)


const initialState: AppSliceStateType = {
  isAppRuninng: false,
  isAppCapturing: false,
  duration: null,
  appName: null,
  relativePath: null,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    startApp: (state, action: PayloadAction<StartAppPayloadType>) => {
      state.isAppRuninng = true;
      state.appName = action.payload.appName;
      state.relativePath = action.payload.relativePath;
      // send post request to the backend from time to time, say 10ms

      // response.data: status 

      // if status is finished, then set isAppRunning false

      // if isAppRunning false send get /Captures/appName?<state.appName>
    },
    startCapture: (state, action: PayloadAction<number>) => {
      state.isAppCapturing = true;
      state.duration = action.payload;
      // send post request to the backend

      // response: status

      // if status is finished, then set isAppCapturing false

      // if isAppRunning ture isAppCapturing false send get /Captures/appName?<state.appName>
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkIsAppRunning.fulfilled, (state, action: PayloadAction<string>) => {
      if (action.payload === 'finished') { // fake string
        // update appSlice state
        state.isAppRuninng = false;
        state.isAppCapturing = false;
        state.appName = null;
        state.duration = null;
        state.relativePath = null;
      }
    });
    builder.addCase(checkIsAppCapturing.fullfilled, (state, action: PayloadAction<string>) => {
      if (action.payload === 'finished') { // fake string
          // update appSlice state
          state.isAppCapturing = false;
      }
    });

  },
  
});

export const { startApp, startCapture } = appSlice.actions;

export default appSlice.reducer;
