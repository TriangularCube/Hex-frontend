import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';

import { watchLogin, watchCookies } from './sagas/api';

const sagaMiddleware = createSagaMiddleware();

const store = createStore( combineReducers( reducers ), applyMiddleware( sagaMiddleware ) );

sagaMiddleware.run( watchLogin );
sagaMiddleware.run( watchCookies );

export default store;