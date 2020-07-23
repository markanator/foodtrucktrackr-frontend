import { combineReducers } from "redux";
import { truckReducer } from "./TruckReducer";
import { foodReducer } from "./MenuItemReducer";

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
    foodReducer,
});
