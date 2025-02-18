import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  store  from './store';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Routes><Route
      path='/*' element={<App />}
    ></Route></Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);

