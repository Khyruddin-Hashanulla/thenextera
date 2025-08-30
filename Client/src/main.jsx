import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { HashRouteHandler } from './App.jsx';
import './index.css';

// Check if we're using OAuth callback route
const isOAuthCallback = window.location.pathname.includes('/auth-success');

console.log('Current URL:', window.location.href);
console.log('Using OAuth callback route:', isOAuthCallback);
console.log('Current pathname:', window.location.pathname);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isOAuthCallback ? <HashRouteHandler /> : <App />}
  </React.StrictMode>
);
