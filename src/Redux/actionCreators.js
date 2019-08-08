import {SET_USER, SET_MOBILE_DRAWER} from "./actionTypes";

export const setUser = ( newUser ) =>  ({
    type: SET_USER,
    newUser
});

export const setMobileDrawer = ( drawerOpen ) => ({
    type: SET_MOBILE_DRAWER,
    drawerOpen
});