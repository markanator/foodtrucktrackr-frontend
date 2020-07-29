import { ADD_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM } from "../actions";

export const initialFoodState = {
    id: null,
    truckId: null,
    itemImage: "",
    name: "",
    itemDescription: "",
    price: null,
};

export const menuItemReducer = (state = initialFoodState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case ADD_MENU_ITEM:
            return state;
        case UPDATE_MENU_ITEM:
            return state;
        case DELETE_MENU_ITEM:
            return state;
        default:
            return state;
    }
};
