/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppSliceStateType {
  isAppRunning: boolean,
  isAppCapturing: boolean,
  duration: number | null,
  appName: string | null,
  filePath: string | null,
  pid: number | null,
  appId: number | null,
  capId: number | null,
}

interface StartAppPayloadType {
  appName: string | null,
  filePath: string | null,
}

interface StartCapturePayloadType {
  pid: number | null,
  duration: number | null,
  appName: string | null,
  graphType: string;
}

const checkIsAppRunning = createAsyncThunk(
  'app/checkIsAppRunning',
  async (pid: number | null) => {
    const appStatus = Boolean(await fetch('/api/app/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid,
      }),
    }).then((res) => res.json()));
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
    return pid;
  },
);
const stopApp = createAsyncThunk(
  'api/stopApp',
  async (pid: number | null) => {
    if (!pid) throw new Error('pid doesn\'t exist');
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
    const endpoint = `/api/dTrace/${args.graphType}`;
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        duration: args.duration,
        pid: args.pid,
        appName: args.appName,
      }),
    }).then((res) => res.json());
  },
);

const initialState: AppSliceStateType = {
  isAppRunning: false,
  isAppCapturing: false,
  duration: null,
  appName: null,
  filePath: null,
  pid: null,
  appId: null,
  capId: null,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setAppCapturing: (state, action: PayloadAction<boolean>) => {
      state.isAppCapturing = action.payload;
    },
    setAppRunning: (state, action: PayloadAction<boolean>) => {
      state.isAppRunning = action.payload;
    },
    setAppId: (state, action: PayloadAction<number>) => {
      state.appId = action.payload;
    },
    setCapId: (state, action: PayloadAction<number>) => {
      state.capId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkIsAppRunning.fulfilled, (state, action: PayloadAction<boolean>) => {
      if (action.payload === false && state.isAppRunning) {
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
        state.isAppCapturing = false;
        state.duration = null;
      }
    });

    builder.addCase(startApp.fulfilled, (state, action: PayloadAction<number | null>) => {
      state.isAppRunning = true;
      state.pid = action.payload;
    });

    builder.addCase(startCapture.fulfilled, (state) => {
      state.isAppCapturing = true;
    });
    builder.addCase(startCapture.rejected, (state, action) => {
      state.isAppCapturing = false;
      console.log('unable to start capture', action.error);
    });

    builder.addCase(stopApp.fulfilled, (state) => {
      state.isAppRunning = false;
      state.pid = null;
    });
    builder.addCase(stopApp.rejected, (_state, action) => {
      console.log('unable to stop app', action.error);
    });
  },
});

export {
  checkIsAppCapturing, checkIsAppRunning, startApp, startCapture, stopApp,
};
export const {
  setAppCapturing, setAppRunning, setCapId, setAppId,
} = appSlice.actions;
export default appSlice.reducer;
