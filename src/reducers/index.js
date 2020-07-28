import { combineReducers } from "redux";
import { truckReducer } from "./TruckReducer";
import { menuItemReducer } from "./MenuItemReducer";

// Kirsten reducer
// import {dinerOperatorReducer} from './dinerOperatorReducer.js

const initialState = {
    user: {
        id: 1,
    },
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    usersReducer,
    truckReducer,
    menuItemReducer,
});
