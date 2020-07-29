import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// auth AXIOS
import { axiosWithAuth } from "../utils/AxiosWithAuth";
// redux
import { useSelector, useDispatch } from "react-redux";
// actions
import * as actions from "../actions";
// styles
import { Button, Spinner } from "reactstrap";

const TruckList = ({ OperatorDashboard }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    // get state from redux
    const ownerState = useSelector((state) => state.tempSiteReducer.user);

    const starStyle = { fontSize: "20px" };
    const [truckList, setTruckList] = useState([]);
    const [loading, setLoading] = useState(true);

    const buttonStyle = { backgroundColor: "rgb(0, 85, 200)" };
    const deleteCard = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        axiosWithAuth()
            .get("http://localhost:5000/trucks")
            .then((res) => {
                // console.log(res.data);
                // filter results based off Logged in user ID
                const ownerTrucks = res.data.filter(
                    (store) => store.user_id === ownerState.id
                );
                setTruckList(ownerTrucks);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spinner color="primary" />;
    }
    return (
        <div>
            <div className="truckListCardContainer">
                {truckList.map((truck) => (
                    <div key={truck.id} className="truckListCard">
                        <img
                            src="https://picsum.photos/300/"
                            alt="truckImage"
                            className="truckPictures"
                        />
                        <div className="truckCardText">
                            <Link to={`/trucks/${truck.id}`}>
                                <h3>Truck Name: {truck.truck_name}</h3>
                            </Link>
                            <h4>Distance: {truck.location}</h4>
                            <h5>Food Description: {truck.truck_description}</h5>
                            <h5>
                                Rating:{" "}
                                <i
                                    className="fas fa-star 8x"
                                    style={starStyle}
                                ></i>
                                <i
                                    className="fas fa-star"
                                    style={starStyle}
                                ></i>
                                <i
                                    className="fas fa-star"
                                    style={starStyle}
                                ></i>
                                <i
                                    className="fas fa-star"
                                    style={starStyle}
                                ></i>
                                <i className="far fa-star"></i>
                            </h5>
                            <h5>Price Range: $-$$</h5>

                            {OperatorDashboard && (
                                <>
                                    <Button
                                        className="btn"
                                        style={buttonStyle}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(actions.edit_truck(truck));
                                            push(`/edit-truck/${truck.id}`);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="btn"
                                        onClick={deleteCard}
                                        id={truck.id}
                                        style={buttonStyle}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TruckList;
