/* eslint no-param-reassign: 0 */
//* redux-toolkit uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FeatureFlags {
  loginUi: boolean,
  captureSidebar: boolean,
}

type FeatureName = 'loginUi' | 'captureSidebar';
export interface ConfigState {
  darkMode: boolean;
  activePage: string;
  features: FeatureFlags;
}

const initialState: ConfigState = {
  darkMode: true,
  activePage: '/history',
  features: {
    loginUi: false,
    captureSidebar: false,
  },
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
    toggleFeature: (state, action: PayloadAction<FeatureName>) => {
      state.features[action.payload] = !state.features[action.payload];
    },
  },
});

export const { setDarkMode, toggleDarkMode, setActivePage } = configSlice.actions;
export default configSlice.reducer;
