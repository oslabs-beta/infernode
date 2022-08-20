/* eslint no-param-reassign: 0 */
//* easy-peasy uses immer to wrap state changes, so param reassignment is not only
//* acceptable, but is the typical pattern for writing actions.

import {
  createStore, createTypedHooks, Action, action, Thunk, thunk,
} from 'easy-peasy';

interface Capture {
  id: number;
  captureName: string;
  date: Date;
  creator: string;
  appName: string;
  data: string;
  saved: boolean,
}

interface CapturesModel {
  captureList: Capture[];
  addCapture: Action<CapturesModel, Capture>;
  // deleteCapture: Action<CapturesModel, Capture>;
  // syncCaptures: Thunk<CapturesModel, Capture>;
}

interface UserModel {
  id: number | null;
  username: string | null;
  authenticated: boolean;
}

interface ConfigModel {
  darkMode: boolean;
  setDarkMode: Action<ConfigModel, boolean>;
  toggleDarkMode: Action<ConfigModel, boolean>;
}

interface StoreModel {
  captures: CapturesModel;
  user: UserModel;
  config: ConfigModel;
}

const store = createStore<StoreModel>({
  captures: {
    captureList: [],
    addCapture: action((state, payload: Capture) => {
      state.captureList.push(payload);
    }),
  },

  user: {
    id: null,
    username: null,
    authenticated: false,
  },

  config: {
    darkMode: true,
    setDarkMode: action((state, payload: boolean) => {
      state.darkMode = payload;
    }),
    toggleDarkMode: action((state) => {
      state.darkMode = !state.darkMode;
    }),
  },

});

const typedHooks = createTypedHooks<StoreModel>();

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
export default store;
