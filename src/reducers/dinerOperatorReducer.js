import * as actions from '../actions';

const initialState = {
    diner: {
        username: '',
        password: '',
        currentLocation: '',
        favoriteTrucks: [],
        isAdding: false,
        error: ""
    },
    operator: {
        username: '',
        password: '',
        trucksOwned: []
    }
}

export const dinerOperatorReducer = (state = initialState, action) => {
    switch (action.type) {
        // add truck to favorites
        case (actions.ADD_FAV_START):
            return {
                ...state,
                isAdding: true
            };
        case (actions.ADD_FAV_SUCCESS):
            return {
                ...state,
                isAdding: false,
                favoriteTrucks: [...state.favoriteTrucks, action.payload]
            };
        case (actions.ADD_FAV_FAILURE):
            return {
                ...state,
                isAdding: false,
                error: action.payload
            };
        // edit rating
        case (actions.EDIT_RATING_START):
            return state;
        case (actions.EDIT_RATING_SUCCESS):
            return state;
        case (actions.EDIT_RATING_FAILURE):
            return state;
        // delete truck from favorites
        case (actions.DELETE_FAV_START):
            return state;
        case (actions.DELETE_FAV_SUCCESS):
            return state;
        case (actions.DELETE_FAV_FAILURE):
            return state;
        // rate truck
        case(actions.RATE_TRUCK_START):
            return state;
        case(actions.RATE_TRUCK_SUCCESS):
            return state;
        case(actions.RATE_TRUCK_FAILURE):
            return state;
        // search for a truck
        case (actions.SEARCH_TRUCKS_START):
            return state;
        case (actions.SEARCH_TRUCKS_SUCCESS):
            return state;
        case (actions.SEARCH_TRUCKS_FAILURE):
            return state;
        default:
            return state;
    }
}