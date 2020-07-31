import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormFeedback, Button, FormText } from 'reactstrap';
import * as Yup from 'yup';
import { axiosWithAuth} from '../../utils/AxiosWithAuth';
//redux hooks to fetch state
import { useSelector } from 'react-redux';

const EditMenuItem = () => {
    const { id } = useParams();

    const truckInfo = useSelector((state) => state.tempSiteReducer.truckInQuestion);

    const [formState, setFormState] = useState({
        image: "",
        name: "",
        description: "",
        price: 0,
    });

    const [errors, setErrors] = useState({
        image: "",
        name: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        console.log('truckInfo', truckInfo);
        setFormState({
            image: truckInfo.menu_item_photo,
            name: truckInfo.menu_item_name,
            description: truckInfo.menu_item_description,
            price: truckInfo.menu_item_price,
        });
    }, []);

    const formSchema = Yup.object().shape({
        image: Yup.string()
            .required("Image url is required")
            .url("Must be a valid url"),
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        price: Yup.number().required("Price is required"),
    });

    const onInputChange = (e) => {
        e.persist();
        Yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrors({
                    ...errors,
                    [e.target.name]: "",
                });
            })
            .catch((err) => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0],
                });
            });

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();

        // refactored for DB needs
        const dbMenuItem = {
            menu_item_photo: formState.image,
            menu_item_name: formState.name,
            menu_item_description: formState.description,
            menu_item_price: formState.price,
            truck_id: id,
        };

        formSchema.isValid(formState).then((valid) => {
            if (valid === true) {
                setErrors({
                    ...errors,
                    submit: "",
                });

                // NEED TO FINISH
                axiosWithAuth()
                    .put(`/trucks/food/${id}`, dbMenuItem)
                    .then(({ data }) => {
                        console.log(data);
                        // need to dispatch add_truck_menu_item(data)
                        // need to refresh truck page to reflect changes
                        
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                setErrors({
                    ...errors,
                    submit: "You must fill out all form fields correctly",
                });
            }
        });
    };

    const deleteItem = () => {
        axiosWithAuth()
            .delete(`/truck/food/${id}`)
            .then()
            .catch()
    };

    return (
        <Form onSubmit={submit}>
                    <FormGroup>
                        <Label for="name">Item Name</Label>
                        <Input
                            className={errors.name ? "is-invalid" : ""}
                            onChange={onInputChange}
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                        />
                        {errors.name && (
                            <FormFeedback>{errors.name}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input
                            className={errors.image ? "is-invalid" : ""}
                            onChange={onInputChange}
                            type="text"
                            id="image"
                            name="image"
                            value={formState.image}
                        />
                        {errors.image && (
                            <FormFeedback>{errors.image}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Price</Label>
                        <Input
                            className={errors.price ? "is-invalid" : ""}
                            onChange={onInputChange}
                            type="number"
                            min="0"
                            step="0.01"
                            id="price"
                            name="price"
                            value={formState.price}
                        />
                        {errors.price && (
                            <FormFeedback>{errors.price}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Description</Label>
                        <Input
                            className={errors.description ? "is-invalid" : ""}
                            onChange={onInputChange}
                            type="textarea"
                            id="description"
                            name="description"
                            value={formState.description}
                        />
                        {errors.description && (
                            <FormFeedback>{errors.description}</FormFeedback>
                        )}
                    </FormGroup>
                    {errors.submit && (
                        <FormText className="bg-danger p-2 mb-2" color="white">
                            {errors.submit}
                        </FormText>
                    )}
                    <Button color="primary"> Add Item</Button>
                    <Button color="secondary">
                        Cancel
                    </Button>
                    <Button>DELETE ITEM</Button>
                </Form>
    )
}

export default EditMenuItem;

//export default connect(mapStateToProps, mapDispatchToProps)(EditMenuItem);

/* import React, { useState } from "react";
import * as Yup from "yup";

// import axios from "axios";
import { axiosWithAuth } from "../../utils/AxiosWithAuth";
// router stuff
import { useParams } from "react-router-dom";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText,
} from "reactstrap";

export default function MenuItemModal(props) {
    // get truck id
    const { id } = useParams();

    const [formState, setFormState] = useState({
        image: "",
        name: "",
        description: "",
        price: 0,
    });

    const [errors, setErrors] = useState({
        image: "",
        name: "",
        description: "",
        price: "",
    });

    const formSchema = Yup.object().shape({
        image: Yup.string()
            .required("Image url is required")
            .url("Must be a valid url"),
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        price: Yup.number().required("Price is required"),
    });

    const onInputChange = (e) => {
        e.persist();
        Yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid) => {
                setErrors({
                    ...errors,
                    [e.target.name]: "",
                });
            })
            .catch((err) => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0],
                });
            });

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();

        // refactored for DB needs
        const dbMenuItem = {
            menu_item_photo: formState.image,
            menu_item_name: formState.name,
            menu_item_description: formState.description,
            menu_item_price: formState.price,
            truck_id: id,
        };

        formSchema.isValid(formState).then((valid) => {
            if (valid === true) {
                setErrors({
                    ...errors,
                    submit: "",
                });

                // NEED TO FINISH
                axiosWithAuth()
                    .post(`/trucks/food/${id}`, dbMenuItem)
                    .then(({ data }) => {
                        console.log(data);
                        // need to dispatch add_truck_menu_item(data)
                        // need to refresh truck page to reflect changes
                        closeModal();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                setErrors({
                    ...errors,
                    submit: "You must fill out all form fields correctly",
                });
            }
        });
    };

    const closeModal = () => {
        setFormState({
            image: "",
            name: "",
            description: "",
            price: "",
        });
        props.toggleModal();
    };

    return (
        <Modal isOpen={props.modal}>
            <ModalHeader>Add Menu Item</ModalHeader>
            <ModalBody>
                <Form onSubmit={submit}>
                    <FormGroup>
                        <Label for="name">Item Name</Label>
                        <Input
                            className={errors.name ? "is-invalid" : ""}
                            onChange={onInputChange}
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                        />
                        {errors.name && (
                            <FormFeedback>{errors.name}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input
                            className={errors.image ? "is-invalid" : ""}
                            onChange={onInputChange}
                            type="text"
                            id="image"
                            name="image"
                            value={formState.image}
                        />
                        {errors.image && (
                            <FormFeedback>{errors.image}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Price</Label>
                        <Input
                            className={errors.price ? "is-invalid" : ""}
                            onChange={onInputChange}
                            type="number"
                            min="0"
                            step="0.01"
                            id="price"
                            name="price"
                            value={formState.price}
                        />
                        {errors.price && (
                            <FormFeedback>{errors.price}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Description</Label>
                        <Input
                            className={errors.description ? "is-invalid" : ""}
                            onChange={onInputChange}
                            type="textarea"
                            id="description"
                            name="description"
                            value={formState.description}
                        />
                        {errors.description && (
                            <FormFeedback>{errors.description}</FormFeedback>
                        )}
                    </FormGroup>
                    {errors.submit && (
                        <FormText className="bg-danger p-2 mb-2" color="white">
                            {errors.submit}
                        </FormText>
                    )}
                    <Button color="primary"> Add Item</Button>
                    <Button onClick={closeModal} color="secondary">
                        Cancel
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}
 */