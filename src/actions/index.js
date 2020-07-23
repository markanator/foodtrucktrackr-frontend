export const DELETE_FAV_TRUCK = "DELETE_FAV_TRUCK";
export const ADD_FAV_TRUCK = "ADD_FAV_TRUCK";
export const EDIT_TRUCK_RATING = "EDIT_TRUCK_RATING";
export const SEARCH_TRUCKS_START = "SEARCH_TRUCKS_START";

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

export const searchTrucksStart = () => {
    console.log("searchTrucksStart action creator");
    return { type: SEARCH_TRUCKS_START }
};