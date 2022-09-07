/* eslint no-param-reassign: 0 */
//* redux-toolkit uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FeatureFlags {
  loginUi: boolean,
  captureSidebar: boolean,
  uploadSidebar: boolean,
}

export interface Filters {
  appName: string,
  captureName: string,
  creator: string,
  date: string,
}

type FeatureName = 'loginUi' | 'captureSidebar';
export interface ConfigState {
  darkMode: boolean;
  activePage: string;
  features: FeatureFlags;
  filters: Filters;
}

const initialState: ConfigState = {
  darkMode: true,
  activePage: '/history',
  features: {
    loginUi: false,
    captureSidebar: false,
    uploadSidebar: false,
  },
  filters: {
    appName: '.*',
    captureName: '.*',
    creator: '.*',
    date: '.*',
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
    updateAppNameFilter: (state, action: PayloadAction<string>) => {
      state.filters.appName = action.payload;
    },
    updateCaptureNameFilter: (state, action: PayloadAction<string>) => {
      state.filters.captureName = action.payload;
    },
    updateCreatorFilter: (state, action: PayloadAction<string>) => {
      state.filters.creator = action.payload;
    },
    updateDateFilter: (state, action: PayloadAction<string>) => {
      state.filters.date = action.payload;
    },
  },
});

export const {
  setDarkMode,
  toggleDarkMode,
  setActivePage,
  updateAppNameFilter,
  updateCaptureNameFilter,
  updateCreatorFilter,
} = configSlice.actions;
export default configSlice.reducer;
