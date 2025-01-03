// solving the error Caution: `ReactDOM` also has a named export `createRoot`. Check if you meant to write `import {createRoot} from 'react-dom/client'` instead. Also the forbidden non null assertion
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// 1.1.28
