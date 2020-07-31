import { combineReducers } from "redux";
// import all reducers
import { truckReducer } from "./TruckReducer";
import { menuItemReducer } from "./MenuItemReducer";
import { dinerOperatorReducer } from "./dinerOperatorReducer.js";

export const rootReducer = combineReducers({
    dinerOperatorReducer,
    truckReducer,
    menuItemReducer,
});
