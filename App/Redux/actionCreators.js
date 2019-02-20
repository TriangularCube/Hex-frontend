import { REQUEST_LOGIN, SET_USER, SHOW_DRAWER } from "./actionTypes";

export const requestLogin = () => ({
    type: REQUEST_LOGIN
});


export const setUser = ( newUser ) =>  ({
    type: SET_USER,
    newUser
});

export const showDrawer = ( shouldShow ) => ({
    type: SHOW_DRAWER,
    shouldShow
});