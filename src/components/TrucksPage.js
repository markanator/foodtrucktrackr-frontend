import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/AxiosWithAuth";

import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardFooter,
    Button,
} from "reactstrap";

//redux to grab state
import { useSelector } from 'react-redux';

const TrucksPage = () => {
    const { push } = useHistory();

    const [truckList, setTruckList] = useState([]);

    const userInfo = useSelector(
        (state) => state.dinerOperatorReducer.user 
    );

    console.log('userInfo', userInfo);

    useEffect(() => {
        /* axiosWithAuth()
            .get("/trucks")
            .then((res) => setTruckList(res.data))
            .catch((err) => console.error(err)); */
        setTruckList(userInfo.favoriteTrucks)
    }, [userInfo.favoriteTrucks]);

    return (
        <div>
            {truckList.map((car) => {
                return (
                    <Card style={{ marginBottom: 20 }} key={car.id}>
                        <CardImg
                            src={car.truck_photo}
                            alt={car.truck_name}
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
                        <CardFooter>
                            <Button
                                color="success"
                                onClick={() => {
                                    push(`/trucks/${car.id}`);
                                }}
                            >
                                Checkout!
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
};

export default TrucksPage;
