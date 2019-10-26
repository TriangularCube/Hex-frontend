const { createStore, combineReducers } = Redux;
import * as reducers from './reducers';

const store = createStore( combineReducers( reducers ) );

export default store;