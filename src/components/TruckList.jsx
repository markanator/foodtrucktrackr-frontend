import React, { useState } from "react";
import {Link} from "react-router-dom";
import { trucks as data } from "../dummy-data";
import { Button } from "reactstrap";

const TruckList = (props) => {
    const starStyle = { fontSize: "20px" };
    const [truckList, setTruckList] = useState(data);

    const deleteCard = (e) => {
        setTruckList(
            truckList.filter((truck) => {
                return truck.id.toString() !== e.target.id;
            })
        );
    };

    const buttonStyle = { backgroundColor: "rgb(0, 85, 200)" };

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
                                <h3>Truck Name: {truck.truckName}</h3>
                            </Link>
                            <h4>Distance: {truck.location}</h4>
                            <h5>Food Description: {truck.truckDescription}</h5>
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

                            {props.OperatorDashboard && (
                                <>
                                    {/* STRETCH:::
										<Button className='btn' style={buttonStyle}>
											Promote
										</Button> 
									*/}
                                    <Button className="btn" style={buttonStyle}>
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
