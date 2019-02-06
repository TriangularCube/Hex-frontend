import { SHOW_DRAWER } from "./actionTypes";

export function showDrawer( shouldShow ){
    return {
        type: SHOW_DRAWER,
        shouldShow
    }
}