import { combineReducers } from "redux";
// import all reducers
import { truckReducer } from "./TruckReducer";
import { menuItemReducer } from "./MenuItemReducer";
import { dinerOperatorReducer } from "./dinerOperatorReducer.js";

const initSiteState = {
    isActive: false,
    user: {
        id: null,
        username: "",
        password: "",
        user_email: "",
        user_first_name: "",
        user_last_name: "",
        user_role: "",
        ownedTrucks: [],
        avatar_url: "",
    },
};

export const tempSiteReducer = (state = initSiteState, action) => {
    switch (action.type) {
        case "LOGGED_IN":
            return {
                ...state,
                isActive: true,
                user: {
                    ...action.payload.user,
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
        case "ADD_TRUCK_TO_OWNED_LIST":
            return {
                ...state,
                user: {
                    ...state.user,
                    ownedTrucks: [...state.user.ownedTrucks, action.payload],
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
