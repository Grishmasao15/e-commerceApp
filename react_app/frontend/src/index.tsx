import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './output.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './components/ECommerce/store';
import { PersistGate } from 'redux-persist/integration/react';

// import store from './components/ECommerce/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
