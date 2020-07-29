import axios from "axios";
import {axiosWithAuth} from '../utils/AxiosWithAuth';

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

export const deleteFavTruck = (truck) => (dispatch) => {
    console.log("deleteFavTruck action creator");
    dispatch({ type: DELETE_FAV_START, payload: truck });
    //is this managed by the backend? or do we manage which trucks are the favorites here in the app? In that case, how do we persist that data?
    axiosWithAuth()
        .delete('/user/:userID/favorites/:truckID')
        .then(res => {
            console.log(res);
            dispatch({ type: DELETE_FAV_SUCCESS });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: DELETE_FAV_FAILURE, payload: err });
        })
};

export const addFavTruck = (truckId) => (dispatch) => {
    console.log("addFavTruck action creator");
    dispatch({ type: ADD_FAV_START, payload: truckId });
    axiosWithAuth()
        .post('/user/:userID/favorites', truckId)
        .then(res => {
            console.log(res);
            dispatch({ type: ADD_FAV_SUCCESS });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: ADD_FAV_FAILURE, payload: err });
        })
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

export const rateTruck = (rating, user_id) => (dispatch) => {
    console.log("rateTruck action creator");
    dispatch({ type: RATE_TRUCK_START, payload: {rating, user_id} });
    axiosWithAuth()
        .post('/trucks/:truck_id/rate', {rating: rating, user_id: user_id})
        .then(res => {
            console.log(res);
            dispatch({ type: RATE_TRUCK_SUCCESS, payload: res });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: RATE_TRUCK_FAILURE, payload: err });
        })
};

export const searchForTrucks = (searchState) => (dispatch) => {
    console.log("searchForTrucks action creator");
    dispatch({ type: SEARCH_TRUCKS_START });
    //axios get request (may need to filter results to return what we want)
    axiosWithAuth()
        .get('/trucks')
        .then(res => { 
            //filter results; 
            console.log(res);
            const searchResults = res.data.filter((result) => {
                return result.truck_cuisine_type === searchState.searchCuisine && `${result.location_city}, ${result.location_state}` === searchState.searchQuery
            });
            dispatch({type: SEARCH_TRUCKS_SUCCESS, payload: searchResults })
        })
        .catch(err => {
            console.log(err);
            dispatch({type: SEARCH_TRUCKS_FAILURE, payload: err});
        });
};

// login/logout

export const login = () => (dispatch) => {
    console.log("login action creator");
    const user = {
        id: 0,
        username: "",
        password: "",
        user_email: "",
        user_first_name: "",
        user_last_name: "",
        user_role: "",
    };
    dispatch({ type: "LOGGED_IN", payload: { ...user } });
    // axios
    //     .post("/api/user", user)
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};

export const logout = (user) => {
    console.log("user wants to log out");
    localStorage.removeItem("token");
    return { type: "LOGGED_OUT", payload: { ...user } };
};

// import {axiosWithAuth} from '../utils/AxiosWithAuth';

// Trucks
export const ADD_TRUCK = "ADD_TRUCK";
export const UPDATE_TRUCK = "UPDATE_TRUCK";
export const DELETE_TRUCK = "DELETE_TRUCK";

const baseURL = "https://lambdatracker.free.beeceptor.com/api";

export const add_truck = (truckInfo) => (dispatch) => {
    console.log("# Operator adding truck...");
    dispatch({ type: "TRUCK_START" });
    axios
        .post(`${baseURL}/trucks`, truckInfo)
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
export const update_owner = (ownerID) => {
    console.log("# userLogged in...");
    return { type: "UPDATE_OWNER", payload: ownerID };
};
export const update_truck = (truckInfo) => (dispatch) => {
    console.log("# Operator adding truck...");
    dispatch({ type: "TRUCK_START" });
    axios
        .put(`${baseURL}/trucks`, truckInfo)
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
export const delete_truck = (truckId) => (dispatch) => {
    console.log("# Operator deleting truck...", truckId);
    dispatch({ type: "TRUCK_START" });
    axios
        .delete(`${baseURL}/truck/${truckId}`)
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
    axios
        .post(`${baseURL}/trucks/menu/${menuItem.truckId}`, menuItem)
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
    axios
        .put(`${baseURL}/trucks/menu/${menuItem.truckId}`, menuItem)
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
    axios
        .delete(`${baseURL}/trucks/menu/${menuItemID}`)
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
