import { ADD_TRUCK, UPDATE_TRUCK, DELETE_TRUCK } from "../actions";

export const initialTruckState = {
    id: 0,
    truckName: "Mexican Truckero",
    truckImage: "mextru.jpg",
    cuisineType: "mex",
    priceRange: "$$",
    location: "mexico",
    truckDescription: "its mexican",
    menuItem: [],
};

export const truckReducer = (state = initialTruckState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case ADD_TRUCK:
            return state;
        case UPDATE_TRUCK:
            return state;
        case DELETE_TRUCK:
            return state;
        default:
            return state;
    }
};
