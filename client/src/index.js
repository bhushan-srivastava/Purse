import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css'
import "@fontsource/roboto";
import "./styles/auth.css"
import "./styles/default_layout.css"
import "./styles/home.css"
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
