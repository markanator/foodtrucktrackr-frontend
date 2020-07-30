import axios from "axios";

export const axiosWithAuth = () => {
    // create a local token
    const token = localStorage.getItem("token");

    return axios.create({
        // base url for our local server
        // once server is hosted use:
        // https://cors-anywhere.herokuapp.com/
        // baseURL: "https://foodtrackertcr.herokuapp.com",
        baseURL: "https://foodtrackertcr.herokuapp.com",
        headers: {
            Authorization: token,
        },
    });
};
