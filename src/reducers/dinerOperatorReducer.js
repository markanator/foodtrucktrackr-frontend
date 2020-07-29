import * as actions from '../actions';

const initialState = {
    diner: {
        username: '',
        password: '',
        currentLocation: '',
        favoriteTrucks: [],
        isAdding: false,
        isDeleting: false,
        dinerError: ''
    },
    searchState: {
        searchTerm: '',
        results: '',
        isSearching: false,
        searchError: ''
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
        // state shape for diner
        /* diner: {
            username: '',
            password: '',
            currentLocation: '',
            favoriteTrucks: [],
            isAdding: false,
            isDeleting: false,
            dinerError: ''
        }, */
        // add truck to favorites
        case (actions.ADD_FAV_START):
            return {
                ...state,
                diner: {
                    ...state.diner,
                    isAdding: true
                }
            };
        case (actions.ADD_FAV_SUCCESS):
            return {
                ...state,
                diner: {
                    ...state.diner,
                    isAdding: false,
                    favoriteTrucks: [...state.favoriteTrucks, action.payload]
                }
            };
        case (actions.ADD_FAV_FAILURE):
            return {
                ...state,
                diner: {
                    ...state.diner,
                    isAdding: false,
                    dinerError: action.payload
                }
            };
        // state shape for diner
        /* diner: {
            username: '',
            password: '',
            currentLocation: '',
            favoriteTrucks: [],
            isAdding: false,
            isDeleting: false,
            dinerError: ''
        }, */
        // delete truck from favorites
        case (actions.DELETE_FAV_START):
            return {
                ...state,
                diner: {
                    ...state.diner,
                    isDeleting: true
                }
            };
        case (actions.DELETE_FAV_SUCCESS):
            return {
                ...state,
                diner: {
                    ...state.diner,
                    isDeleting: false,
                    favoriteTrucks: [state.favoriteTrucks.filter(truck => truck !== action.payload)]
                }
            };
        case (actions.DELETE_FAV_FAILURE):
            return {
                ...state,
                diner: {
                    ...state.diner,
                    isDeleting: false,
                    dinerError: action.payload
                }
            };
        
        // rate truck
        // state shape for diner
        /* diner: {
            username: '',
            password: '',
            currentLocation: '',
            favoriteTrucks: [],
            isAdding: false,
            isDeleting: false,
            dinerError: ''
        }, */
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
        /* case (actions.EDIT_RATING_START):
            return state;
        case (actions.EDIT_RATING_SUCCESS):
            return state;
        case (actions.EDIT_RATING_FAILURE):
            return state; */
        

            // state shape for searchState
            /* searchState: {
                searchTerm: '',
                results: '',
                isSearching: false,
                error: ''
            } */
        // search for a truck
        case (actions.SEARCH_TRUCKS_START):
            return {
                ...state,
                searchState: {
                    ...state.searchState,
                    isSearching: true
                }
            };
        case (actions.SEARCH_TRUCKS_SUCCESS):
            return {
                ...state,
                searchState: {
                    ...state.searchState,
                    isSearching: false,
                    results: action.payload
                }
            };
        case (actions.SEARCH_TRUCKS_FAILURE):
            return {
                ...state,
                searchState: {
                    ...state.searchState,
                    isSearching: false,
                    searchError: action.payload
                }
            };
        default:
            return state;
    }
}