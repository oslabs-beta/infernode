/* eslint no-param-reassign: 0 */
//* redux-toolkit uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number | null;
  username: string | null;
  authenticated: boolean;
  submit: {
    username: string,
    password: string,
  },
  popover: boolean,
}

export interface UserLogin {
  username: string;
  password: string;
}

const initialState: UserState = {
  id: null,
  username: null,
  authenticated: false,
  submit: {
    username: '',
    password: '',
  },
  popover: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // todo: placeholder only, does not do any authentication checks
    login: (state) => {
      state.username = state.submit.username;
      state.authenticated = true;
      state.id = 0;
      state.popover = false;
      state.submit.username = '';
      state.submit.password = '';
    },
    logout: (state) => {
      state.popover = false;
      state.username = null;
      state.authenticated = false;
      state.id = null;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.submit.username = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.submit.password = action.payload;
    },
    togglePopover: (state) => {
      state.popover = !state.popover;
    },
  },
});

export const {
  login, logout, updatePassword, updateUsername, togglePopover,
} = userSlice.actions;
export default userSlice.reducer;
