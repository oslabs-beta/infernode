import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootEle = document.getElementById('root');
if (rootEle === null) throw new Error('Failed to find root element for React app');
const root = createRoot(rootEle);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
