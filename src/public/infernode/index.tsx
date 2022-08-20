import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import App from './App';
import store from './store/store';

//! Temporary fix for React 18 compatibility issues in Easy-Peasy
//* See: https://github.com/ctrlplusb/easy-peasy/issues/741
//*      https://github.com/ctrlplusb/easy-peasy/pull/745

type Props = StoreProvider['props'] & { children: React.ReactNode };
const StoreProviderCasted = StoreProvider as unknown as React.ComponentType<Props>;

const rootEle = document.getElementById('root');
if (rootEle === null) {
  throw new Error('Failed to find root element for React app');
}
const root = createRoot(rootEle);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProviderCasted store={store}>
        <App />
      </StoreProviderCasted>
    </BrowserRouter>
  </React.StrictMode>,
);
