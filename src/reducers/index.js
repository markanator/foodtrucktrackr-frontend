import { combineReducers } from "redux";

const initialState = {
    user: {
        id: 0,
    },
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

import { TruckReducer } from "./TruckReducer";

export const rootReducer = combineReducers({
    usersReducer,
    TruckReducer,
});
