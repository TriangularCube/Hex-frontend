import { SET_USER, SHOW_DRAWER } from './actionTypes'

/*
Reducers are combined in Store

Each function name is also the state name
*/
export function shouldShowDrawer( state = false, action ){

    if( action.type === SHOW_DRAWER ){

        return action.shouldShow;

    }
    return state;

}

export function user( state = null, action ){

    if( action.type === SET_USER ){
        if( state !== action.newUser ){
            return action.newUser;
        } else {
            return state;
        }
    }

    return state;

}