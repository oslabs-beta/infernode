/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppSliceStateType {
  isAppRunning: boolean | null,
  isAppCapturing: boolean | null,
  duration: number | null,
  appName: string | null,
  filePath: string | null,
  pid: number | null,
}

interface StartAppPayloadType {
  appName: string | null,
  filePath: string | null,
}

interface StartCapturePayloadType {
  pid: number | null,
  duration: number | null,
}

const checkIsAppRunning = createAsyncThunk(
  'app/checkIsAppRunning',
  async (pid: number | null) => {
    console.log('start app polling action');
    const appStatus = Boolean(await fetch('/api/app/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid,
      }),
    }).then((res) => res.json()));
    console.log('app status is', appStatus);
    return appStatus;
  },
);
const checkIsAppCapturing = createAsyncThunk(
  'app/checkIsAppCapturing',
  async () => {
    const captureStatus = Boolean(await fetch('/api/appCapture').then((res) => res.json()));
    return captureStatus;
  },
);

const startApp = createAsyncThunk(
  'api/startApp',
  async (args: StartAppPayloadType) => {
    console.log('start callback');
    // console.log('args before the fetch request to api/app/start', args);
    if (!args.appName || !args.filePath) console.log('entries not valid');
    const pid = Number(await fetch('/api/app/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appName: args.appName,
        filePath: args.filePath,
      }),
    }).then((res) => res.json()));
    console.log('got pid back', pid);
    return pid;
  },
);
const stopApp = createAsyncThunk(
  'api/stopApp',
  async (pid: number | null) => {
    if (!pid) throw new Error('pid doesn\'t exist');
    console.log('stop callback');
    await fetch('/api/app/stop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    console.log('start capture callback', args, ' is args');
    await fetch('/api/dTrace/flamegraph', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        duration: args.duration,
        pid: args.pid,
      }),
    }).then((res) => res.json());
    console.log('finished start capture callback');
  },
);

const initialState: AppSliceStateType = {
  isAppRunning: null,
  isAppCapturing: null,
  duration: null,
  appName: null,
  filePath: null,
  pid: null,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkIsAppRunning.fulfilled, (state, action: PayloadAction<boolean>) => {
      console.log('checkisapprunning action payload is ', action.payload, state.isAppRunning);
      if (action.payload === false && state.isAppRunning) { // false: not running
        // update appSlice state
        state.isAppRunning = false;
        state.appName = null;
        state.filePath = null;
        state.pid = null;
        if (state.isAppCapturing) {
          state.isAppCapturing = false;
          state.duration = null;
        }
      }
    });

    builder.addCase(checkIsAppCapturing.fulfilled, (state, action: PayloadAction<boolean>) => {
      if (action.payload === false && state.isAppCapturing) {
        // update appSlice state
        state.isAppCapturing = false;
        state.duration = null;
      }
    });

    builder.addCase(startApp.fulfilled, (state, action: PayloadAction<number | null>) => {
      state.isAppRunning = true;
      state.pid = action.payload;
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
