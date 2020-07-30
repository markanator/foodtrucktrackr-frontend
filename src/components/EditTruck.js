import React, { useState, useEffect } from "react";
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Spinner,
} from "reactstrap";
// date-time picker
import DateTimePicker from "react-datetime-picker";

import { axiosWithAuth } from "../utils/AxiosWithAuth";

// redux hooks
import { useSelector, useDispatch } from "react-redux";
// for id
import { useParams } from "react-router-dom";
// actions
// import * as actions from "../actions";

export default function EditTruck(props) {
    // get id
    const { id } = useParams();
    // for redux actions
    const dispatch = useDispatch();
    // get state from redux
    const truckState = useSelector((state) => state.truckReducer);

    const [loading, setLoading] = useState(true);
    // time picker stuff
    const [truck_arrival_time, setArrival] = useState(
        truckState.truck_arrival_time
    );
    const [truck_departure_time, setDeparture] = useState(
        truckState.truck_departure_time
    );

    const [formData, setFormData] = useState({ ...truckState });

    useEffect(() => {
        if (truckState.id != null) {
            setLoading(false);
        }
    }, [id, truckState.id]);

    const cuisineTypes = [
        "American",
        "Mexican",
        "Greek",
        "SeaFood",
        "Vegan Exclusive",
        "Vegetarian",
        "Chinese",
        "Thai",
        "Dessert",
        "Italian",
        "Filipino",
        "Kosher",
    ];

    const onInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        // its what the database needs
        // ask Pedro!
        const arrDate =
            new Date(truck_arrival_time).getHours() * 60 +
            new Date(truck_arrival_time).getMinutes();
        const depDate =
            new Date(truck_departure_time).getHours() * 60 +
            new Date(truck_departure_time).getMinutes();

        // refactor to ensure database gets what it needs
        const dbTruck = {
            truck_name: formData.truckName,
            truck_departure_time: arrDate,
            truck_arrival_time: depDate,
            user_id: formData.ownerID,
            location_zip_code: formData.zip,
            location_city: formData.city,
            location_address: formData.address,
            location_state: formData.state,
            truck_cuisine_type: formData.cuisineType,
            truck_description: formData.truckDescription,
        };

        axiosWithAuth()
            .put(`/trucks/${id}`, dbTruck)
            .then((resp) => {
                // dispatch({
                //     type: "TRUCK_SUCCESS",
                //     payload: resp.data.results,
                // });
                console.log("SUBMITTED!");
                console.log("post truck resp:: ", resp);
            })
            .catch((err) => {
                dispatch({ type: "TRUCK_FAIL" });
                console.error(err);
            });
    };

    if (loading) {
        return <Spinner color="primary" />;
    }
    return (
        <Container className="form-container">
            <Form className="createTruckForm" onSubmit={submit}>
                <h1>Create a Truck</h1>
                <FormGroup>
                    <Label for="truckName">Truck Name</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        name="truck_name"
                        placeholder="Enter your truck's name"
                        value={formData.truck_name}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        name="truck_image"
                        placeholder="Url of an image of your truck"
                        value={formData.truck_image}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="cuisineType">Cuisine Type</Label>
                    <Input
                        onChange={onInputChange}
                        type="select"
                        name="truck_cuisine_type"
                        required
                        defaultValue="-- Select your cuisine type --"
                        value={formData.truck_cuisine_type}
                    >
                        {cuisineTypes.map((cuisine_type) => {
                            return (
                                <option value={cuisine_type} key={cuisine_type}>
                                    {cuisine_type}
                                </option>
                            );
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="priceRange">Price Range</Label>
                    <Input
                        onChange={onInputChange}
                        type="select"
                        name="price_range"
                        required
                        value={formData.price_range}
                    >
                        <option value="" disabled>
                            -- Select your price range --
                        </option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        name="location_address"
                        placeholder="Street address"
                        value={formData.location_address}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        name="location_city"
                        placeholder="City"
                        value={formData.location_city}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        name="location_state"
                        placeholder="State"
                        value={formData.location_state}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="zip">Zip</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        name="location_zip_code"
                        placeholder="Local zip code"
                        value={formData.location_zip_code}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        onChange={onInputChange}
                        type="textarea"
                        name="truck_description"
                        placeholder="Tell us what you're all about!"
                        value={formData.truck_description}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Arrival Time:
                        <br />
                        <DateTimePicker
                            onChange={setArrival}
                            value={truck_arrival_time}
                            clearIcon="Clear"
                            required={true}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Departure Time:
                        <br />
                        <DateTimePicker
                            onChange={setDeparture}
                            value={truck_departure_time}
                            clearIcon="Clear"
                        />
                    </Label>
                </FormGroup>

                <Button color="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
