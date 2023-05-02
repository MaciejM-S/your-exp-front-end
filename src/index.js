import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {theme} from './theme';
import {ThemeProvider} from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root'));

export const baseUrl = 'https://your-exp-api.onrender.com'

root.render(
<ThemeProvider theme={theme} >
  <React.StrictMode>
    <App />
  </React.StrictMode>
</ThemeProvider>
);

reportWebVitals();
