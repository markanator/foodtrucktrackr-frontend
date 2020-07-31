import * as actions from "../actions";

const initialState = {
    isActive: false,
    user: {
        id: null,
        username: "",
        password: "",
        user_email: "",
        user_first_name: "",
        user_last_name: "",
        user_role: "",
        ownedTrucks: [],
        avatar_url: "",
    },
    truckInQuestion: {
        isRating: false,
        truckError: "",
    },
    searchState: {
        searchQuery: "",
        searchCuisine: "",
        searchRadius: "",
        results: "",
        isSearching: false,
        searchError: "",
    },
    // diner: {
    //     username: "",
    //     password: "",
    //     currentLocation: "",
    //     favoriteTrucks: [],
    //     isAdding: false,
    //     isDeleting: false,
    //     dinerError: "",
    // },
    // operator: {
    //     username: "",
    //     password: "",
    //     trucksOwned: [
    //         {
    //             truckId: "",
    //             imageOfTruck: "",
    //             cuisineType: "",
    //             customerRatings: [],
    //             customerRatingAvg: "",
    //             menu: [],
    //         },
    //     ],
    // },
    // truck: {
    //     id: "",
    //     rating: "",
    //     isRating: false,
    //     truckError: "",
    // },
    rating: {
        truckRating: '',
        isRating: '',
        ratingError: ''
    }
};

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
        case actions.ADD_FAV_START:
            return {
                ...state
                /* diner: {
                    ...state.diner,
                    isAdding: true,
                }, */
            };
        case actions.ADD_FAV_SUCCESS:
            return {
                ...state
                /* diner: {
                    ...state.diner,
                    isAdding: false,
                    favoriteTrucks: [...state.favoriteTrucks, action.payload],
                }, */
            };
        case actions.ADD_FAV_FAILURE:
            return {
                ...state
                /* diner: {
                    ...state.diner,
                    isAdding: false,
                    dinerError: action.payload,
                }, */
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
        case actions.DELETE_FAV_START:
            return {
                ...state
                /* diner: {
                    ...state.diner,
                    isDeleting: true,
                }, */
            };
        case actions.DELETE_FAV_SUCCESS:
            return {
                ...state
                /* diner: {
                    ...state.diner,
                    isDeleting: false,
                    favoriteTrucks: [
                        state.favoriteTrucks.filter(
                            (truck) => truck !== action.payload
                        ),
                    ],
                }, */
            };
        case actions.DELETE_FAV_FAILURE:
            return {
                ...state,
                /* diner: {
                    ...state.diner,
                    isDeleting: false,
                    dinerError: action.payload,
                }, */
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
        // state shape for truck
        /* truck: {
            id: '',
            rating: '',
            isRating: false,
            truckError: ''
        } */
        // will need access to specific truck in order to complete this
        // action.payload should include truck id and rating
        case actions.RATE_TRUCK_START:
            return {
                ...state,
                rating: {
                    ...state.rating,
                    isRating: true
                }
            };
        case actions.RATE_TRUCK_SUCCESS:
            return {
                ...state,
                rating: {
                    ...state.rating,
                    truckRating: action.payload,
                    isRating: false
                }
            };
        case actions.RATE_TRUCK_FAILURE:
            return {
                ...state,
                rating: {
                    ...state.rating,
                    ratingError: action.payload,
                    isRating: false
                }
            };

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
                searchQuery: '',
                searchCuisine: '',
                searchRadius: '',
                results: '',
                isSearching: false,
                error: ''
            } */
        // search for a truck
        case actions.SEARCH_TRUCKS_START:
            return {
                ...state,
                searchState: {
                    ...state.searchState,
                    isSearching: true,
                },
            };
        case actions.SEARCH_TRUCKS_SUCCESS:
            return {
                ...state,
                searchState: {
                    ...state.searchState,
                    isSearching: false,
                    results: action.payload,
                },
            };
        case actions.SEARCH_TRUCKS_FAILURE:
            return {
                ...state,
                searchState: {
                    ...state.searchState,
                    isSearching: false,
                    searchError: action.payload,
                },
            };

        // MERGED FROM TEMPSITEREDUCER
        case "LOGGED_IN":
            return {
                ...state,
                isActive: true,
                user: {
                    ...action.payload.user,
                },
            };
        case "LOGGED_OUT":
            return {
                ...state,
                isActive: false,
                user: {
                    ...action.payload,
                },
            };
        case "ADD_TRUCK_TO_OWNED_LIST":
            return {
                ...state,
                user: {
                    ...state.user,
                    ownedTrucks: [...state.user.ownedTrucks, action.payload],
                },
            };
        case "TRUCK_IN_QUESTION":
            return {
                ...state,
                truckInQuestion: action.payload,
            };
        default:
            return state;
    }
};
