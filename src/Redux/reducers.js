import {SET_DRAWER, SET_MOBILE_DRAWER, SET_USER} from './actionTypes'

import { saveStateName } from "../util/constants";

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