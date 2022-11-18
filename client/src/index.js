import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css'
import "@fontsource/roboto";
import "./styles/auth.css"
import "./styles/user.css"
import "./styles/home.css"
import "./styles/transactions.css"
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
