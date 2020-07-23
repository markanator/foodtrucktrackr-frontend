import { ADD_TRUCK, UPDATE_TRUCK, DELETE_TRUCK } from "../actions";
import { ADD_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM } from "../actions";

export const initialTruckState = {
    id: 0,
    truckName: "Mexican Truckero",
    truckImage: "",
    cuisineType: "",
    priceRange: "",
    location: "",
    truckDescription: "",
    menuItem: [
        {
            id: 0,
            itemImage: "taco.jpg",
            name: "Tacos x3",
            itemDescription: "its three tacos",
            price: 1000,
        },
    ],
};

export const truckReducer = (state = initialTruckState, action) => {
    console.log(state, action);
    switch (action.type) {
        case ADD_TRUCK:
            return state;
        case UPDATE_TRUCK:
            return state;
        case DELETE_TRUCK:
            return state;
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
