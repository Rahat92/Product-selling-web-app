import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
ReactDom.render(
    <Provider store = {store}>
      <App />
    </Provider>,
    document.querySelector('#root')
);

