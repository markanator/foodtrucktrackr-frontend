import axios from 'axios';

// user actions
// delete truck from favorites
export const DELETE_FAV_START = "DELETE_FAV_START";
export const DELETE_FAV_SUCCESS = "DELETE_FAV_SUCCESS";
export const DELETE_FAV_FAILURE = "DELETE_FAV_FAILURE";
// add truck to favorites
export const ADD_FAV_START = "ADD_FAV_START";
export const ADD_FAV_SUCCESS = "ADD_FAV_SUCCESS";
export const ADD_FAV_FAILURE = "ADD_FAV_FAILURE";
// edit truck rating
export const EDIT_RATING_START = "EDIT_RATING_START";
export const EDIT_RATING_SUCCESS = "EDIT_RATING_SUCCESS";
export const EDIT_RATING_FAILURE = "EDIT_RATING_SUCCESS";
// rate truck
export const RATE_TRUCK_START = "RATE_TRUCK_START";
export const RATE_TRUCK_SUCCESS = "RATE_TRUCK_SUCCESS";
export const RATE_TRUCK_FAILURE = "RATE_TRUCK_FAILURE";
// search for a truck
export const SEARCH_TRUCKS_START = "SEARCH_TRUCKS_START";
export const SEARCH_TRUCK_SUCCESS = "SEARCH_TRUCK_SUCCESS";
export const SEARCH_TRUCK_FAILURE = "SEARCH_TRUCK_FAILURE";

export const deleteFavTruck = truck => dispatch => {
    console.log("deleteFavTruck action creator");
    dispatch({ type: DELETE_FAV_START, payload: truck });
    /* axios
        .delete('url', truck?)
        .then(res => {
            console.log(res);
            dispatch({ type: DELETE_FAV_SUCCESS });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: DELETE_FAV_FAILURE, payload: err });
        }) */
};

export const addFavTruck = newTruck => dispatch => {
    console.log("addFavTruck action creator");
    dispatch({ type: ADD_FAV_START, payload: newTruck });
    /* axios
        .post('url', newTruck)
        .then(res => {
            console.log(res);
            dispatch({ type: ADD_FAV_SUCCESS });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: ADD_FAV_FAILURE, payload: err });
        }) */
};

export const editTruckRating = newRating => dispatch => {
    console.log("editTruckRating action creator");
    dispatch({ type: EDIT_RATING_START, payload: newRating});
    /* axios
        .put('url', newRating)
        .then(res => {
            console.log(res);
            dispatch({ type: EDIT_RATING_SUCCESS });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: EDIT_RATING_FAILURE, payload: err });
        }) */
};

export const rateTruck = rating => dispatch => {
    console.log("rateTruck action creator");
    dispatch({ type: RATE_TRUCK_START, payload: rating });
    /* axios
        .post('url', rating)
        .then(res => {
            console.log(res);
            dispatch({ type: RATE_TRUCK_SUCCESS });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: RATE_TRUCK_FAILURE, payload: err });
        }) */
}

export const searchTrucksStart = searchState => dispatch => {
    console.log("searchTrucksStart action creator");
    dispatch({ type: SEARCH_TRUCKS_START });
    //axios get request (may need to filter results to return what we want)
    /* axios
        .get("url")
        .then(res => { 
            filter results; 
            dispatch({type: SEARCH_TRUCK_SUCCESS, payload: res....})
        })
        .catch(err => {
            dispatch({type: SEARCH_TRUCK_FAILURE, payload: err})
        }); */
};