import { SET_DATABASE, SET_MOBILE_DRAWER, SET_USER } from './actionTypes'

/*
Reducers are combined in Store

Each function name is also the state name
*/


export const user = ( state = null, action ) => {

    if( action.type === SET_USER ){
        return action.newUser;
    }

    // Default return state
    return state;

};

export const mobileDrawerOpen = ( state = false, action ) => {

    if( action.type === SET_MOBILE_DRAWER ){
        return action.drawerOpen;
    }

    return state;

};

export const cardDatabase = ( state = null, action ) => {

    if( action.type === SET_DATABASE ){
        return action.database;
    }

    return state;

};