import * as actions from '../actions';

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
        case (actions.ADD_FAV_START):
            return state;
        case (actions.EDIT_RATING_START):
            return state;
        case (actions.DELETE_FAV_START):
            return state;
        case(actions.RATE_TRUCK_START):
            return state;
        case (actions.SEARCH_TRUCKS_START):
            return state;
        default:
            return state;
    }
}