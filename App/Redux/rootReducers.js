import {SET_USER} from './Actions/actionTypes'

/*
Reducers are combined in Store

Each function name is also the state name
*/


export function user( state = null, action ){

    if( action.type === SET_USER ){
        if( state !== action.newUser ){
            return action.newUser;
        } else {
            return state;
        }
    }

    // Default return state
    return state;

}

// UI Reducers
import * as UIReducers from './UIReducers';
import {combineReducers} from "redux";

let UI = combineReducers( UIReducers );

export { UI };