import ReactDOM from 'react-dom/client';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';
import { UserProvider } from './container/hook/useUserName';
import './index.css';

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