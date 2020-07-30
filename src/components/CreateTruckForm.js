import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
// date-time picker
import DateTimePicker from "react-datetime-picker";

import { axiosWithAuth } from "../utils/AxiosWithAuth";

// redux hooks
import { useDispatch, useSelector } from "react-redux";
// actions
// import * as actions from "../actions";

export default function CreateTruckForm(props) {
    // for redux actions
    const dispatch = useDispatch();
    // get state from redux
    const ownerState = useSelector((state) => state.tempSiteReducer.user);
    // time picker stuff
    const [arrival, setArrival] = useState(
        new Date("December 31, 2100 21:00:00")
    );
    const [departure, setDeparture] = useState(
        new Date("December 31, 2100 23:59:59")
    );

    const [formData, setFormData] = useState({
        ownerID: ownerState.id,
        truckName: "",
        truckImage: "",
        cuisineType: "",
        priceRange: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        truckDescription: "",
        menuItem: [],
        truck_departure: 0,
        truck_arrival: 0,
    });

    console.log("ownerID", formData.ownerID);

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

        const dbTruck = {
            truck_name: formData.truckName,
            truck_departure_time: new Date("December 31, 2100 21:00:00"),
            truck_arrival_time: new Date("December 31, 2100 23:59:59"),
            user_id: formData.ownerID,
            location_zip_code: formData.zip,
            location_city: formData.city,
            location_address: formData.address,
            location_state: formData.state,
        };

        console.log(dbTruck);
        // setTimeout(() => {
        // dispatch(actions.add_truck(dbTruck));
        axiosWithAuth()
            .post(`/trucks`, dbTruck)
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
        // }, 1500);
    };

    return (
        <Container className="form-container">
            <Form className="createTruckForm" onSubmit={submit}>
                <h1>Create a Truck</h1>
                <FormGroup>
                    <Label for="truckName">Truck Name</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        id="truckName"
                        name="truckName"
                        placeholder="Enter your truck's name"
                        value={formData.truckName}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        id="image"
                        name="truckImage"
                        placeholder="Url of an image of your truck"
                        value={formData.image}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="cuisineType">Cuisine Type</Label>
                    <Input
                        onChange={onInputChange}
                        type="select"
                        id="cuisineType"
                        name="cuisineType"
                        required
                        defaultValue="-- Select your cuisine type --"
                    >
                        {/* <option
                            value="-- Select your cuisine type --"
                            disabled
                        ></option> */}
                        {cuisineTypes.map((cuisineType) => {
                            return (
                                <option value={cuisineType} key={cuisineType}>
                                    {cuisineType}
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
                        id="priceRange"
                        name="priceRange"
                        required
                        defaultValue=""
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
                        id="address"
                        name="address"
                        placeholder="Street address"
                        value={formData.address}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        id="state"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="zip">Zip</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="Local zip code"
                        value={formData.zip}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        onChange={onInputChange}
                        type="textarea"
                        id="description"
                        name="truckDescription"
                        placeholder="Tell us what you're all about!"
                        value={formData.description}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        Arrival Time:
                        <br />
                        <DateTimePicker
                            onChange={setArrival}
                            value={arrival}
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
                            value={departure}
                            clearIcon="Clear"
                        />
                    </Label>
                </FormGroup>

                <Button color="primary">Submit</Button>
            </Form>
        </Container>
    );
}
