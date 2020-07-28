import React from "react";

// redux hooks
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// actions
import * as actions from "../actions";
// dummy data
import { trucks } from "../DummyData";
import { Card, CardBody, CardImg, CardSubtitle, Button } from "reactstrap";

const TrucksPage = () => {
    const dispatch = useDispatch();
    // const truckies = useSelector((state) => state.truckReducer);
    // console.log(truckies);

    return (
        <div>
            {trucks.map((car) => {
                return (
                    <Card style={{ marginBottom: 20 }} key={car.id}>
                        <CardImg
                            src={car.truckImage}
                            alt={car.truckImage}
                            width="250"
                        />
                        <CardBody>
                            <b>{car.truckName}</b>
                        </CardBody>
                        <CardSubtitle>Cuisine: {car.cuisineType}</CardSubtitle>
                        <CardBody>{car.truckDescription}</CardBody>
                        {/* START TERNARY
                            if user is logged in &&
                            user.id === car.ownerID
                        */}
                        <Button
                            color="danger"
                            style={{ width: 100 }}
                            onClick={() => {
                                dispatch(actions.delete_truck(car.id));
                            }}
                        >
                            DELETE
                        </Button>
                        {/* END TERNARY */}
                    </Card>
                );
            })}
        </div>
    );
};

export default TrucksPage;
