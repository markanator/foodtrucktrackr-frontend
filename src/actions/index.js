// Trucks
export const ADD_TRUCK = "ADD_TRUCK";
export const UPDATE_TRUCK = "UPDATE_TRUCK";
export const DELETE_TRUCK = "DELETE_TRUCK";

export const add_truck = (truckInfo) => {
    console.log("# Operator adding truck...");
    return { type: ADD_TRUCK, payload: truckInfo };
};
export const update_truck = (truckInfo) => {
    console.log("# Operator updating truck...");
    return { type: UPDATE_TRUCK, payload: truckInfo };
};
export const delete_truck = (truckId) => {
    console.log("# Operator deleting truck...");
    return { type: DELETE_TRUCK, payload: truckId };
};

// Menu Items
export const ADD_MENU_ITEM = "ADD_MENU_ITEM";
export const UPDATE_MENU_ITEM = "UPDATE_MENU_ITEM";
export const DELETE_MENU_ITEM = "DELETE_MENU_ITEM";

export const add_menu_item = (menuItem) => {
    console.log("# Operator adding menuItem to Truck...");
    return { type: ADD_MENU_ITEM, payload: menuItem };
};
export const add_menu_item = (menuItem) => {
    console.log("# Operator updating menuItem to Truck...");
    return { type: UPDATE_MENU_ITEM, payload: menuItem };
};
export const add_menu_item = (menuItemID) => {
    console.log("# Operator deleting menuItem to Truck...");
    return { type: DELETE_MENU_ITEM, payload: menuItemID };
};
