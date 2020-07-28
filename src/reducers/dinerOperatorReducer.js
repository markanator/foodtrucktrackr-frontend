import * as actions from '../actions';

const initialState = {
    diner: {
        username: '',
        password: '',
        currentLocation: '',
        favoriteTrucks: [],
        isAdding: false,
        error: "",
        isDeleting: false
    },
    searchState: {
        searchTerm: '',
        results: '',
        isSearching: false
    },
    operator: {
        username: '',
        password: '',
        trucksOwned: [
            {
                truckId: '',
                imageOfTruck: '',
                cuisineType: '',
                customerRatings: [],
                customerRatingAvg: '',
                menu: []
            }
        ]
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
        // delete truck from favorites
        case (actions.DELETE_FAV_START):
            return {
                ...state,
                isDeleting: true
            };
        case (actions.DELETE_FAV_SUCCESS):
            return {
                ...state,
                isDeleting: false,
                favoriteTrucks: [state.favoriteTrucks.filter(truck => truck !== action.payload)]
            };
        case (actions.DELETE_FAV_FAILURE):
            return {
                ...state,
                isDeleting: false,
                error: action.payload
            };
        
        // rate truck
        // will need access to specific truck in order to complete this
        // action.payload should include truck id and rating
        case(actions.RATE_TRUCK_START):
            return state;
        case(actions.RATE_TRUCK_SUCCESS):
            return state;
        case(actions.RATE_TRUCK_FAILURE):
            return state;

        // edit rating
        // will need access to specific truck in order to complete this
        // will need access to user's original rating in order to update it
        // action.payload should include truck id and newRating
        case (actions.EDIT_RATING_START):
            return state;
        case (actions.EDIT_RATING_SUCCESS):
            return state;
        case (actions.EDIT_RATING_FAILURE):
            return state;
        
        // search for a truck
        case (actions.SEARCH_TRUCKS_START):
            return {
                ...state,
                isSearching: true
            };
        case (actions.SEARCH_TRUCKS_SUCCESS):
            return {
                ...state,
                isSearching: false,
                results: action.payload
            };
        case (actions.SEARCH_TRUCKS_FAILURE):
            return {
                ...state,
                isSearching: false,
                error: ''
            };

        // login
        case (actions.LOGIN):
            return state;
        default:
            return state;
    }
}