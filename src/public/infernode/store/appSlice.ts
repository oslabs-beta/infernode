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

interface StartCapturePayloadType {
  pid: string | null;
  duration: number | null;
  appName: string | null;
}

const checkIsAppRunning = createAsyncThunk(
  'app/checkIsAppRunning',
  async () => {
    console.log('start app polling action');
    const appStatus = String(await fetch('/api/captures/isAppRunning').then((res) => res.json()));
    console.log('app status is', appStatus);
    return appStatus;
  },
);
const checkIsAppCapturing = createAsyncThunk(
  'app/checkIsAppCapturing',
  async () => {
    const captureStatus = String(await fetch('/api/appCapture').then((res) => res.json()));
    return captureStatus;
  },
);

const startApp = createAsyncThunk(
  'api/startApp',
  async (args: StartAppPayloadType) => {
    console.log('start callback');
    if (!args.appName || !args.relativePath) return new Error('invalid entries');
    const pid = String(await fetch('/api/captures/startApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset-UTF-8',
      },
      body: JSON.stringify({
        appName: args.appName,
        relativePath: args.relativePath,
      }),
    }).then((res) => res.json()));
    console.log('got pid back', pid);
    return pid;
  },
);
const stopApp = createAsyncThunk(
  'api/stopApp',
  async (pid: string | null) => {
    if (!pid) throw new Error('pid doesn\'t exist');
    console.log('stop callback');
    await fetch('/api/captures/stopApp', {
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
  'api/startCapture',
  async (args: StartCapturePayloadType) => {
    console.log('start capture callback');
    await fetch('/api/captures/startCapture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset-UTF-8',
      },
      body: JSON.stringify({
        duration: args.duration,
        pid: args.pid,
        appName: args.appName,
      }),
    }).then((res) => res.json());
    console.log('finished start capture callback');
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
      console.log('checkisapprunning action payload is ', action.payload, state.isAppRunning);
      if (action.payload === 'finished' && state.isAppRunning) { // fake string
        // update appSlice state
        state.isAppRunning = false;
        state.appName = null;
        state.relativePath = null;
        state.pid = null;
        if (state.isAppCapturing) { // Luke said we don't need worry about it probably 9/1
          state.isAppCapturing = false;
          state.duration = null;
        }
      }
    });

    builder.addCase(checkIsAppCapturing.fulfilled, (state, action: PayloadAction<string>) => {
      if (action.payload === 'finished' && state.isAppCapturing) { // fake string
        // update appSlice state
        state.isAppCapturing = false;
        state.duration = null;
      }
    });

    builder.addCase(startApp.fulfilled, (state, action: PayloadAction<string | Error>) => {
      state.isAppRunning = true;
      state.pid = String(action.payload);
      console.log('startApp is fullfilled state.pid is ', state.pid, state.isAppRunning);
    });

    builder.addCase(startCapture.fulfilled, (state) => { // action: PayloadAction<void>
      state.isAppCapturing = true;
    });

    // builder.addCase(startCapture.rejected, (state, action: PayloadAction<void>) => {
    //   console.log('unable to start capture');
    // });

    builder.addCase(stopApp.fulfilled, (state) => { // action: PayloadAction<void>
      state.isAppRunning = false;
      state.pid = null;
    });
    // builder.addCase(stopApp.rejected, (state, action: PayloadAction<void>) => {
    //   console.log('start capture is rejected')
    // });
  },
});

export {
  checkIsAppCapturing, checkIsAppRunning, startApp, startCapture, stopApp,
};

export default appSlice.reducer;