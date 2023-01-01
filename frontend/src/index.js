import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './container/hook/useUserName';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: 'top center',
  timeout: 1000,
  offset: '10px',
  transition: 'fade',
  type: 'success',
  containerStyle: {
    zIndex: 10000,
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <UserProvider>
      <App />
    </UserProvider>
  </AlertProvider>
);