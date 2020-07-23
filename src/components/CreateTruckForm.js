import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

// redux hooks
import { useDispatch, useSelector } from "react-redux";
// actions
import * as actions from "../actions";

export default function CreateTruckForm(props) {
    const dispatch = useDispatch();
    const ownerState = useSelector((state) => state.truckReducer);

    const [formData, setFormData] = useState({
        ownerID: ownerState.id,
        truckName: "",
        truckImage: "",
        cuisineType: "",
        priceRange: "",
        location: "",
        truckDescription: "",
        menuItem: [],
    });
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
        dispatch(actions.add_truck(formData));
        console.log(formData);
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
                    <Label for="location">Location</Label>
                    <Input
                        onChange={onInputChange}
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Where are you located?"
                        value={formData.location}
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
                <Button color="primary">Submit</Button>
            </Form>
        </Container>
    );
}
