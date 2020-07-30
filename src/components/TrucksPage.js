import React, { useEffect, useState } from "react";

// redux hooks
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

// actions
import * as actions from "../actions";

import { Card, CardBody, CardImg, CardSubtitle, Button } from "reactstrap";

const TrucksPage = () => {
    const dispatch = useDispatch();

    const [truckList, setTruckList] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get("/trucks")
            .then((res) => setTruckList(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            {truckList.map((car) => {
                return (
                    <Card style={{ marginBottom: 20 }} key={car.id}>
                        <CardImg
                            src={car.truck_image}
                            alt={car.truck_image}
                            width="250"
                        />
                        <CardBody>
                            <b>{car.truck_name}</b>
                        </CardBody>
                        <CardSubtitle>
                            Cuisine: {car.truck_cuisine_type}
                        </CardSubtitle>
                        <CardBody>{car.truck_description}</CardBody>
                        {/* <Button
                            color="danger"
                            style={{ width: 100 }}
                            onClick={() => {
                                dispatch(actions.delete_truck(car.id));
                            }}
                        >
                            Remove F
                        </Button> */}
                    </Card>
                );
            })}
        </div>
    );
};

export default TrucksPage;
