import {
	SET_IS_LARGE,
	TOGGLE_IS_LARGE,
	TOGGLE_DRAWER,
	TOGGLE_MOBILE_DRAWER,
	SET_MOBILE_DRAWER
} from "./Actions/UIActionTypes";

export function shouldShowDrawer( state = true, action ){

	if( action.type === TOGGLE_DRAWER ){
		return !state;
	}

	// Default return state
	return state;

}

// Don't need to directly set Non-Mobile drawer

export function shouldShowMobileDrawer( state = false, action ){

	if( action.type === TOGGLE_MOBILE_DRAWER ){
		return !state;
	}

	if( action.type === SET_MOBILE_DRAWER ){
		return action.isOpen;
	}

	return state;

}

export function isLarge( state = true, action ){

	if( action.type === SET_IS_LARGE ){
		return action.isLarge;
	}

	if( action.type === TOGGLE_IS_LARGE ){
		return !state;
	}

	return state;

}