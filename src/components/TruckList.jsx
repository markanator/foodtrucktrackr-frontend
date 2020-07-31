import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// connect component to Redux store
import { connect } from "react-redux";
// auth AXIOS
import { axiosWithAuth } from "../utils/AxiosWithAuth";
// redux
import { useSelector, useDispatch } from "react-redux";
// actions
import * as actions from "../actions";
// styles
import { Button, Spinner } from "reactstrap";

const TruckList = ({ OperatorDashboard, ...props }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    // get state from redux
    const ownerState = useSelector((state) => state.dinerOperatorReducer.user);

    const starStyle = { fontSize: "20px" };
    // owner trucks list initial load
    const [truckList, setTruckList] = useState([]);
    // loading visual
    const [loading, setLoading] = useState(true);
    // uncomment this ^^^ when server is working
    //const [loading, setLoading] = useState(false);

    const buttonStyle = { backgroundColor: "rgb(0, 85, 200)" };

    useEffect(() => {
        // fetch current trucks
        axiosWithAuth()
            .get("/trucks")
            .then((res) => {
                // console.log(res.data);
                // filter results based off Logged in user ID
                const ownerTrucks = res.data.filter(
                    (store) => store.operator_id === ownerState.id
                );
                setTruckList(ownerTrucks);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [ownerState.ownedTrucks]);

    if (loading) {
        return <Spinner color="primary" />;
    }

    if (props.searchResults) {
        setTruckList(props.searchResults);
    }

    return (
        <div>
            <div className="truckListCardContainer">
                {truckList.map((truck) => (
                    <div key={truck.id} className="truckListCard">
                        <img
                            src={truck.truck_photo}
                            alt="truckImage"
                            className="truckPictures"
                            width="425px"
                        />
                        <div className="truckCardText">
                            <Link to={`/trucks/${truck.id}`}>
                                <h3 style={{ textAlign: "center" }}>
                                    Truck Name: {truck.truck_name}
                                </h3>
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
                            <h5>Price Range: {truck.price_range}</h5>

                            {OperatorDashboard && (
                                <>
                                    <Button
                                        color="primary"
                                        // className="btn"
                                        // style={buttonStyle}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(actions.edit_truck(truck));
                                            push(`/edit-truck/${truck.id}`);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="danger"
                                        // className="btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            axiosWithAuth()
                                                .delete(`/trucks/${truck.id}`)
                                                .then((resp) => {
                                                    // console.log(resp);
                                                    push("/operator");
                                                })
                                                .catch((err) =>
                                                    console.error(err)
                                                );
                                        }}
                                        id={truck.id}
                                        // style={buttonStyle}
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

const mapStateToProps = (state) => {
    return {
        state: state,
    };
};

export default connect(mapStateToProps, {})(TruckList);

//export default TruckList;
// commented out ^^^ to connect component to the store
