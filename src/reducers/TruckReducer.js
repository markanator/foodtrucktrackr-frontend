// import { ADD_TRUCK, UPDATE_TRUCK, DELETE_TRUCK } from "../actions";

const initialTruckState = {
    id: 0,
    userId: 0,
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
        case "POST_TRUCK_START":
            return state;
        case "TRUCK_SUCCESS":
            return state;
        case "TRUCK_FAIL":
            return state;
        case "UPDATE_OWNER":
            return { ...state, userId: action.payload };
        default:
            return state;
    }
};
