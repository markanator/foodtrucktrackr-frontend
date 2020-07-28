import { combineReducers } from "redux";
// import all reducers
import { truckReducer } from "./TruckReducer";
import { menuItemReducer } from "./MenuItemReducer";
import { dinerOperatorReducer } from "./dinerOperatorReducer.js";

// const initialState = {
//     user: {
//         id: 1,
//     },
// };

// export const usersReducer = (state = initialState, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };

export const rootReducer = combineReducers({
    dinerOperatorReducer,
    truckReducer,
    menuItemReducer,
});
