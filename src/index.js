import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Configure axios defaults for CSRF protection with Express's csurf package
axios.defaults.withCredentials = true; // Always send cookies with requests

// The csurf package in Express commonly uses _csrf as the cookie name
// and expects X-CSRF-Token or csrf-token as the header
axios.defaults.xsrfCookieName = '_csrf'; 
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

// Add request interceptor to handle Express csurf tokens
axios.interceptors.request.use(
  config => {
    // Get the CSRF token from cookies
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const parts = cookie.trim().split('=');
      if (parts.length === 2) {
        acc[parts[0]] = parts[1];
      }
      return acc;
    }, {});
    
    // If we have any token in cookies, add it to every request header
    // using multiple header formats to maximize compatibility
    const csrfToken = cookies['_csrf'] || cookies['XSRF-TOKEN'] || cookies['csrf-token'];
    if (csrfToken) {
      // Express csurf commonly uses these header names
      config.headers['X-CSRF-Token'] = csrfToken;
      config.headers['csrf-token'] = csrfToken;
      // Also include XSRF-TOKEN for other implementations
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    
    return config;
  },
  error => Promise.reject(error)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
