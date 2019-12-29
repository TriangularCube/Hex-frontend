import { SET_USER, SET_MOBILE_DRAWER, SET_DATABASE } from "./actionTypes";

export const setUser = ( newUser ) =>  ({
    type: SET_USER,
    newUser
});

export const setMobileDrawer = ( drawerOpen ) => ({
    type: SET_MOBILE_DRAWER,
    drawerOpen
});

export const setDatabase = ( database ) => ({
    type: SET_DATABASE,
    database
});