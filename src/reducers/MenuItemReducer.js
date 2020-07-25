import { ADD_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM } from "../actions";

export const initialFoodState = {
    id: 0,
    truckId: 0,
    itemImage: "taco.jpg",
    name: "Tacos x3",
    itemDescription: "its three tacos",
    price: 1000,
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
