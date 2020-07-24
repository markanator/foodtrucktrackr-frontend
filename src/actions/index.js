// user actions
export const DELETE_FAV_TRUCK = "DELETE_FAV_TRUCK";
export const ADD_FAV_TRUCK = "ADD_FAV_TRUCK";
export const EDIT_TRUCK_RATING = "EDIT_TRUCK_RATING";
export const RATE_TRUCK = "RATE_TRUCK";
export const SEARCH_TRUCKS_START = "SEARCH_TRUCKS_START";
export const SEARCH_TRUCK_SUCCESS = "SEARCH_TRUCK_SUCCESS";
export const SEARCH_TRUCK_FAILURE = "SEARCH_TRUCK_FAILURE";

export const deleteFavTruck = () => {
    console.log("deleteFavTruck action creator");
    return { type: DELETE_FAV_TRUCK };
};

export const addFavTruck = newTruck => {
    console.log("addFavTruck action creator");
    return { type: ADD_FAV_TRUCK, payload: newTruck };
};

export const editTruckRating = newRating => {
    console.log("editTruckRating action creator");
    return { type: EDIT_TRUCK_RATING, payload: newRating};
};

export const searchTrucksStart = searchState => dispatch => {
    console.log("searchTrucksStart action creator");
    dispatch({ type: SEARCH_TRUCKS_START });
    //axios get request (may need to filter results to return what we want)
    //axios
        //.get("url")
        //.then(res => { 
            //filter results; dispatch({type: SEARCH_TRUCK_SUCCESS, payload: res....})
        //})
        //.catch(err => {
            //dispatch({type: SEARCH_TRUCK_FAILURE, payload: err})
        //});
};