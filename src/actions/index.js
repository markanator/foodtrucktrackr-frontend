// import axios from "axios";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

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
export const SEARCH_TRUCKS_SUCCESS = "SEARCH_TRUCK_SUCCESS";
export const SEARCH_TRUCKS_FAILURE = "SEARCH_TRUCK_FAILURE";
// login
export const LOGIN = "LOGIN";

export const deleteFavTruck = (truckId) => (dispatch) => {
    console.log("deleteFavTruck action creator");
    dispatch({ type: DELETE_FAV_START });
    axiosWithAuth()
        .delete(`/trucks/favorites/${truckId}`)
        .then((res) => {
            console.log(res);
            dispatch({ type: DELETE_FAV_SUCCESS, payload: truckId });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: DELETE_FAV_FAILURE, payload: err });
        });
};

export const addFavTruck = (truckId) => (dispatch) => {
    console.log("addFavTruck action creator");
    dispatch({ type: ADD_FAV_START });
    axiosWithAuth()
        .post(`/trucks/favorites/${truckId}`, {})
        .then((res) => {
            console.log(res);
            dispatch({ type: ADD_FAV_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            console.log('err', err);
            dispatch({ type: ADD_FAV_FAILURE, payload: err });
        });
};

/* export const editTruckRating = (newRating) => (dispatch) => {
    console.log("editTruckRating action creator");
    dispatch({ type: EDIT_RATING_START, payload: newRating });
    axios
        .put('url', newRating)
        .then(res => {
            console.log(res);
            dispatch({ type: EDIT_RATING_SUCCESS });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: EDIT_RATING_FAILURE, payload: err });
        })
}; */

export const rateTruck = (rating, truckId) => (dispatch) => {
    console.log("rateTruck action creator");
    dispatch({ type: RATE_TRUCK_START, payload: rating });
    axiosWithAuth()
        .post(`/trucks/ratings/${truckId}`, {rating: rating})
        .then(res => {
            console.log(res);
            dispatch({ type: RATE_TRUCK_SUCCESS, payload: res });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: RATE_TRUCK_FAILURE, payload: err });
        });
};

export const searchForTrucks = (searchState) => (dispatch) => {
    //console.log("searchForTrucks action creator, searchState", searchState);
    dispatch({ type: SEARCH_TRUCKS_START });
    //axios get request (may need to filter results to return what we want)
    axiosWithAuth()
        .get("/trucks")
        .then((res) => {
            //filter results;
            //console.log('res from search', res);
            const searchResults = res.data.filter(result => {
                //cuisine and location are provided
                if (searchState.cuisineType !== "" && searchState.query !== "") {
                    return result.truck_cuisine_type === searchState.cuisineType.toLowerCase() && `${result.location_city}, ${result.location_state}` === searchState.query.toLowerCase();
                } else if (searchState.cuisineType === "") { //cuisine not provided
                    return `${result.location_city}, ${result.location_state}` === searchState.query.toLowerCase();
                } else if (searchState.query === "") { //location not provided
                    return result.truck_cuisine_type === searchState.cuisineType.toLowerCase();
                }
            });
            dispatch({ type: SEARCH_TRUCKS_SUCCESS, payload: {results: searchResults, cuisine: searchState.cuisineType, location: searchState.query, radius: searchState.radius} });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: SEARCH_TRUCKS_FAILURE, payload: err });
        });
};

// TEMP SITE REDUCER

export const login = (user) => {
    console.log("login action creator");
    return { type: "LOGGED_IN", payload: user };
};

export const logout = (user) => {
    console.log("user wants to log out");
    localStorage.removeItem("token");
    return { type: "LOGGED_OUT", payload: { ...user } };
};

export const addTruckToOwnedList = (truck) => {
    console.log("ADD_TRUCK_TO_OWNED_LIST");
    return { type: "ADD_TRUCK_TO_OWNED_LIST", payload: truck };
};

// Trucks
export const ADD_TRUCK = "ADD_TRUCK";
export const UPDATE_TRUCK = "UPDATE_TRUCK";
export const DELETE_TRUCK = "DELETE_TRUCK";

// const baseURL = "http://localhost:5000";

export const add_truck = (truckInfo) => (dispatch) => {
    console.log("# Operator adding truck...");
    dispatch({ type: "TRUCK_START" });
};
export const update_owner = (ownerID) => {
    console.log("# userLogged in...");
    return { type: "UPDATE_OWNER", payload: ownerID };
};
export const edit_truck = (truckInfo) => (dispatch) => {
    dispatch({ type: "EDIT_TRUCK_SETUP", payload: { ...truckInfo } });
};

export const update_truck = (truckInfo) => (dispatch) => {
    console.log("# Operator adding truck...");

    dispatch({ type: "TRUCK_START" });

    axiosWithAuth()
        .put(`/trucks/${truckInfo.id}`, truckInfo)
        .then((resp) => {
            dispatch({
                type: "TRUCK_SUCCESS",
                payload: resp.data,
            });
            console.log("SUBMITTED!");
            console.log(resp.data);
        })
        .catch((err) => {
            dispatch({ type: "TRUCK_FAIL" });
            console.error(err);
        });
};
export const delete_truck = (truckId) => (dispatch) => {
    console.log("# Operator deleting truck...", truckId);
    dispatch({ type: "TRUCK_START" });
    axiosWithAuth()
        .delete(`/trucks/${truckId}`)
        .then((resp) => {
            dispatch({
                type: "TRUCK_SUCCESS",
            });
            console.log("SUBMITTED!");
            console.log(resp.data);
        })
        .catch((err) => {
            dispatch({ type: "TRUCK_FAIL" });
            console.error(err);
        });
};

// Menu Items
export const ADD_MENU_ITEM = "ADD_MENU_ITEM";
export const UPDATE_MENU_ITEM = "UPDATE_MENU_ITEM";
export const DELETE_MENU_ITEM = "DELETE_MENU_ITEM";

export const add_menu_item = (menuItem) => (dispatch) => {
    console.log("# Operator adding truck...");
    dispatch({ type: "TRUCK_START" });
    // NEED TO FINISH
    axiosWithAuth()
        .post(`/trucks/menu/${menuItem.truckId}`, menuItem)
        .then((resp) => {
            dispatch({
                type: "TRUCK_SUCCESS",
                payload: resp.data.results,
            });
            console.log("SUBMITTED!");
            console.log(resp.data);
        })
        .catch((err) => {
            dispatch({ type: "TRUCK_FAIL" });
            console.error(err);
        });
};
export const update_menu_item = (menuItem) => (dispatch) => {
    console.log("# Operator adding truck...");
    dispatch({ type: "TRUCK_START" });
    // NEED TO FINISH
    axiosWithAuth()
        .put(`/trucks/menu/${menuItem.truckId}`, menuItem)
        .then((resp) => {
            dispatch({
                type: "TRUCK_SUCCESS",
                payload: resp.data.results,
            });
            console.log("SUBMITTED!");
            console.log(resp.data);
        })
        .catch((err) => {
            dispatch({ type: "TRUCK_FAIL" });
            console.error(err);
        });
};
export const delete_menu_item = (menuItemID) => (dispatch) => {
    console.log("# Operator adding truck...");
    dispatch({ type: "TRUCK_START" });
    axiosWithAuth()
        .delete(`/trucks/food/${menuItemID}`)
        .then((resp) => {
            dispatch({
                type: "TRUCK_SUCCESS",
                payload: resp.data.results,
            });
            console.log("SUBMITTED!");
            console.log(resp.data);
        })
        .catch((err) => {
            dispatch({ type: "TRUCK_FAIL" });
            console.error(err);
        });
};

export const truckInQuestion = (truckInfo) => (dispatch) => {
    dispatch({ type: "TRUCK_IN_QUESTION", payload: truckInfo })
}
