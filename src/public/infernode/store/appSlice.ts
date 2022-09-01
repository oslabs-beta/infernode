/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppSliceStateType {
  isAppRunning: boolean,
  isAppCapturing: boolean,
  duration: number | null,
  appName: string | null,
  relativePath: string | null,
  pid: string | null,
}
interface StartAppPayloadType {
  appName: string | null;
  relativePath: string | null;
}

const checkIsAppRunning = createAsyncThunk(
  'app/checkIsAppRunning',
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const appStatus = await fetch('/api/app').then((res) => res.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return appStatus;
  },
);
const checkIsAppCapturing = createAsyncThunk(
  'app/checkIsAppCapturing',
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const captureStatus = await fetch('/api/appCapture').then((res) => res.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return captureStatus;
  },
);

const startApp = createAsyncThunk(
  'api/startApp',
  async (args: StartAppPayloadType) => {
    console.log('start callback');
    if (!args.appName || !args.relativePath) return new Error('invalid entries');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pid = await fetch('/api/captures/startApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset-UTF-8',
      },
      body: JSON.stringify({
        appName: args.appName,
        relativePath: args.relativePath,
      }),
    }).then((res) => res.json());
    console.log('got pid back', pid);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return pid;
  },
);
const stopApp = createAsyncThunk(
  'api/stopApp',
  async (pid: number) => {
    console.log('stop callback');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await fetch('/api/stopApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset-UTF-8',
      },
      body: JSON.stringify({
        pid,
      }),
    });
  },
);

const startCapture = createAsyncThunk(
  'api/appCapture',
  async (duration: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const startCaptureResult = await fetch('/api/appCapture', { 
      headers: {
        'Content-Type': 'application/json;charset-UTF-8',
      },
      body: JSON.stringify({
        duration,
      }),
    }).then((res) => res.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return startCaptureResult;
  },
);

const initialState: AppSliceStateType = {
  isAppRunning: false,
  isAppCapturing: false,
  duration: null,
  appName: null,
  relativePath: null,
  pid: null,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkIsAppRunning.fulfilled, (state, action: PayloadAction<string>) => {
      if (action.payload === 'finished') { // fake string
        // update appSlice state
        state.isAppRunning = false;
        state.isAppCapturing = false;
        state.appName = null;
        state.duration = null;
        state.relativePath = null;
      }
    });

    builder.addCase(checkIsAppCapturing.fulfilled, (state, action: PayloadAction<string>) => {
      if (action.payload === 'finished') { // fake string
        // update appSlice state
        state.isAppCapturing = false;
      }
    });

    builder.addCase(startApp.fulfilled, (state, action: PayloadAction<string>) => {
      console.log('startApp is fullfilled state.pid is ', state.pid, state.isAppRunning);
      state.isAppRunning = true;
      state.pid = action.payload;
    });

    builder.addCase(startCapture.fulfilled, (state, action: PayloadAction<void>) => {
      state.isAppCapturing = true;
    });

    builder.addCase(stopApp.fulfilled, (state, action: PayloadAction<void>) => {
      state.isAppRunning = false;
    });
  },
});

export {
  checkIsAppCapturing, checkIsAppRunning, startApp, startCapture, stopApp,
};

export default appSlice.reducer;
