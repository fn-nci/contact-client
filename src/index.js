import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Configure axios defaults for CSRF protection
axios.defaults.withCredentials = true; // Always send cookies with requests

// Default axios configuration
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; // The cookie name used for the CSRF token
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'; // The header name to send the token in

// Add request interceptor to handle CSRF tokens
axios.interceptors.request.use(
  config => {
    // Get the CSRF token from cookies
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {});
    
    // If we have a CSRF token in cookies, add it to every request header
    const csrfToken = cookies['XSRF-TOKEN'] || cookies['_csrf'];
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
      config.headers['X-CSRF-Token'] = csrfToken;
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
