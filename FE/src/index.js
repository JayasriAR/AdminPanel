import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import rootReducers from './rootreducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import SignupForm from './registerForm';
import LoginForm from './login';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducers, applyMiddleware(thunk));



root.render(
  <>
    <Provider store={store}>
      <App/>
    </Provider>
  </>
  
);


