import { combineReducers } from "redux";
import { truckReducer } from "./TruckReducer";
import { menuItemReducer } from "./MenuItemReducer";

// Kirsten reducer
// import {dinerOperatorReducer} from './dinerOperatorReducer.js

const initialState = {
<<<<<<< HEAD
    diner: {

    },
    operator: {
        trucks: [
            {
                menu: [
                    {
                        itemName: '',
                        itemDescription: ''
                    }
                ]
            }
        ]
    }
}
=======
    user: {
        id: 1,
    },
};
>>>>>>> master

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
