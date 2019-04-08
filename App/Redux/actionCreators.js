import { REQUEST_LOGIN, SET_USER, SHOW_DRAWER, CHECK_COOKIE } from "./actionTypes";

export const requestLogin = () => ({
    type: REQUEST_LOGIN
});


export const setUser = ( newUser ) =>  ({
    type: SET_USER,
    newUser
});

export const checkCookie = () => ({
    type: CHECK_COOKIE
});