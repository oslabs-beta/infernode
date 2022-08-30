/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppSliceStateType {
  isAppRuninng: boolean,
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
    if (!args.appName || !args.relativePath) return new Error('invalid entries');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pid = await fetch('/api/startApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset-UTF-8',
      },
      body: JSON.stringify({
        appName: args.appName,
        relativePath: args.relativePath,
      }),
    }).then((res) => res.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return pid;
  },
);
const stopApp = createAsyncThunk(
  'api/stopApp',
  async (pid: number) => {
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
    const startCaptureResult = await fetch('/api/app', {
      method: 'POST',
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
  isAppRuninng: false,
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
        state.isAppRuninng = false;
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
      state.isAppRuninng = true;
      state.pid = action.payload;
    });

    builder.addCase(startCapture.fulfilled, (state, action: PayloadAction<void>) => {
      state.isAppCapturing = true;
    });

    builder.addCase(stopApp.fulfilled, (state, action: PayloadAction<void>) => {
      state.isAppRuninng = false;
    });
  },
});

export {
  checkIsAppCapturing, checkIsAppRunning, startApp, startCapture, stopApp,
};

export default appSlice.reducer;
