import { ADD_FAV_TRUCK, EDIT_TRUCK_RATING, DELETE_FAV_TRUCK, RATE_TRUCK, SEARCH_TRUCKS_START } from '../actions';

const initialState = {
    diner: {
        username: '',
        password: '',
        currentLocation: '',
        favoriteTrucks: []
    },
    operator: {
        username: '',
        password: '',
        trucksOwned: []
    }
}

export const dinerOperatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ADD_FAV_TRUCK):
            return state;
        case (EDIT_TRUCK_RATING):
            return state;
        case (DELETE_FAV_TRUCK):
            return state;
        case(RATE_TRUCK):
            return state;
        case (SEARCH_TRUCKS_START):
            return state;
        default:
            return state;
    }
}