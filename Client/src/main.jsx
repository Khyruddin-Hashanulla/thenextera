import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { HashRouteHandler } from './App.jsx';
import './index.css';

// Check if we're using a hash route for OAuth callback
const isHashRoute = window.location.hash && window.location.hash.includes('/auth-success');

console.log('Current URL:', window.location.href);
console.log('Using hash route:', isHashRoute);
console.log('Current hash:', window.location.hash);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isHashRoute ? <HashRouteHandler /> : <App />}
  </React.StrictMode>
);
