/* eslint no-param-reassign: 0 */
//* redux-toolkit uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  darkMode: boolean;
  activePage: string;
}

const initialState: ConfigState = {
  darkMode: true,
  activePage: '/history',
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
  },
});

export const { setDarkMode, toggleDarkMode, setActivePage } = configSlice.actions;
export default configSlice.reducer;
