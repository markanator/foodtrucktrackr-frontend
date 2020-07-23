import React from "react";

// redux hooks
import { useSelector } from "react-redux";
// dummy data
import { trucks } from "../DummyData";
import { Card, CardBody, CardImg, CardSubtitle } from "reactstrap";

const TrucksPage = () => {
    const truckies = useSelector((state) => state.truckReducer);
    console.log(truckies);

    return (
        <div>
            {trucks.map((car) => {
                return (
                    <Card style={{ marginBottom: 20 }}>
                        <CardImg
                            src={car.truckImage}
                            alt={car.truckImage}
                            width='250'
                        />
                        <CardBody>
                            <b>{car.truckName}</b>
                        </CardBody>
                        <CardSubtitle>Cuisine: {car.cuisineType}</CardSubtitle>
                        <CardBody>{car.truckDescription}</CardBody>
                    </Card>
                );
            })}
        </div>
    );
};

export default TrucksPage;
