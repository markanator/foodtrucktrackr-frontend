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

//import dummy data since server is not working
//import { trucks } from '../dummy-data';

const TruckList = ({ OperatorDashboard, ...props }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    // get state from redux
    const ownerState = useSelector((state) => state.tempSiteReducer.user);

    const starStyle = { fontSize: "20px" };
    const [truckList, setTruckList] = useState([]);
    //server is not working so I'm going to use the dummy data
    //const [truckList, setTruckList] = useState(trucks);
    const [loading, setLoading] = useState(true);
    // uncomment this ^^^ when server is working
    //const [loading, setLoading] = useState(false);

    const buttonStyle = { backgroundColor: "rgb(0, 85, 200)" };
    const deleteCard = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        axiosWithAuth()
            .get("/trucks")
            .then((res) => {
                // console.log(res.data);
                // filter results based off Logged in user ID
                const ownerTrucks = res.data.filter(
                    (store) => store.user_id === ownerState.id
                );
                console.log('res in TruckList useEffect', res);
                console.log(props.state);
                //setTruckList(ownerTrucks);
                setTruckList(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);
    // uncomment this ^^^ when server is working

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

const mapStateToProps = (state) => {
    return {
        state: state
    };
};

export default connect(mapStateToProps, {})(TruckList);

//export default TruckList;
// commented out ^^^ to connect component to the store
