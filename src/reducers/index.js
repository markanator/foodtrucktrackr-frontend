import { combineReducers } from "redux";
// import all reducers
import { truckReducer } from "./TruckReducer";
import { menuItemReducer } from "./MenuItemReducer";
import { dinerOperatorReducer } from "./dinerOperatorReducer.js";

const initSiteState = {
    isActive: false,
    user: {
        id: 0,
        username: "",
        password: "",
        user_email: "",
        user_first_name: "",
        user_last_name: "",
        user_role: "",
    },
};

export const tempSiteReducer = (state = initSiteState, action) => {
    switch (action.type) {
        case "LOGGED_IN":
            return {
                ...state,
                isActive: true,
                user: {
                    ...action.payload,
                },
            };
        case "LOGGED_OUT":
            return {
                ...state,
                isActive: false,
                user: {
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    dinerOperatorReducer,
    truckReducer,
    menuItemReducer,
    tempSiteReducer,
});
