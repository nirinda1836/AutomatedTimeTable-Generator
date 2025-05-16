import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This import should match your file name
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);