import {SET_IS_LARGE, TOGGLE_IS_LARGE, TOGGLE_DRAWER, TOGGLE_MOBILE_DRAWER, SET_MOBILE_DRAWER} from "./UIActionTypes";

export const toggleDrawer = () => ({
	type: TOGGLE_DRAWER
});

export const toggleMobileDrawer = () => ({
	type: TOGGLE_MOBILE_DRAWER
});

export const setMobileDrawer = ( isOpen ) => ({
	type: SET_MOBILE_DRAWER,
	isOpen
});

export const setIsLarge = ( isLarge ) => ({
	type: SET_IS_LARGE,
	isLarge
});

export const toggleIsLarge = () => ({
	type: TOGGLE_IS_LARGE
});