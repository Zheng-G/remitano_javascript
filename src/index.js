import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSageMiddleware from 'redux-saga';

import createForm from './store/reducers';
import mySaga from './store/sagas';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSageMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(createForm, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
