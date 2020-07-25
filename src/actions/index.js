import axios from "axios";
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
export const update_truck = (truckInfo) => {
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

export const add_menu_item = (menuItem) => {
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
export const update_menu_item = (menuItem) => {
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
export const delete_menu_item = (menuItemID) => {
    console.log("# Operator adding truck...");
    dispatch({ type: "TRUCK_START" });
    axios
        .delete(`${baseURL}/trucks/menu/${menuItem.truckId}`)
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
