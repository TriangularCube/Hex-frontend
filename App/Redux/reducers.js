import { combineReducers } from "redux"
import { SHOW_DRAWER } from "./actionTypes"

function shouldShowDrawer( state = false, action ){

    if( action.type === SHOW_DRAWER ){


        if( action.shouldShow === state ){
            return state;
        } else {
            return action.shouldShow;
        }

    }
    return state;

}

const reducers = combineReducers({
    // This is the list of names in the State. Also function names above.
    shouldShowDrawer
});

export default reducers;