import { combineReducers } from "redux"
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER
} from "./actionTypes"
import { VisibilityFilters } from "./actionCreators";
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter( state = SHOW_ALL, action ){
    switch ( action.type ) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function todos( state = [], action ){
    switch ( action.type ) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case TOGGLE_TODO:
            return state.map( (todo, index) => {

                // Manipulate data if it's the right index
                if( index === action.index ){
                    // return Object.assign({}, todo, {
                    //     completed: !todo.completed
                    // })

                    // Using new syntax, not sure if it works yet
                    return { ...state, completed: !todo.completed };
                }

                // Otherwise return it normally
                return todo;
            });
        default:
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;