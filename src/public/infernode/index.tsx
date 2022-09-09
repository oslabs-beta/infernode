import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';

const rootEle = document.getElementById('root');
if (rootEle === null) {
  throw new Error('Failed to find root element for React app');
}
const root = createRoot(rootEle);
root.render(
  <React.StrictMode>
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  </React.StrictMode>,
);
