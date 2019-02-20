import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';

import { watchLogin } from './sagas/api';

const sagaMiddleware = createSagaMiddleware();

const store = createStore( combineReducers( reducers ), applyMiddleware( sagaMiddleware ) );

sagaMiddleware.run( watchLogin );

export default store;