import React from 'react';
import { ToastContainer } from 'react-toastify';
import './styles/global.scss';

import Routes from './routes';

function App() {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        className="toast-container"
        toastClassName="dark-toast"
      />
      <Routes />
    </>
  );
}

export default App;
