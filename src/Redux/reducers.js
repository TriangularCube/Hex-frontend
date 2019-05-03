import { SET_USER } from './actionTypes'

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