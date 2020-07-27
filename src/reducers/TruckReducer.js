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
    isLoading: false,
};

export const truckReducer = (state = initialTruckState, action) => {
    // console.log(state, action);
    switch (action.type) {
        case "TRUCK_START":
            return { ...state, isLoading: true };
        case "TRUCK_SUCCESS":
            return { ...state, isLoading: false };
        case "TRUCK_FAIL":
            return { ...state, isLoading: false };
        case "UPDATE_OWNER":
            return { ...state, userId: action.payload };
        default:
            return state;
    }
};
