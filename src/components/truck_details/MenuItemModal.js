import React, {useState} from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap';
import * as Yup from "yup";

export default function MenuItemModal(props){
    const [formState, setFormState] = useState({
        image: "",
        name: "",
        description: "",
        price: 0
    });

    const [errors, setErrors] = useState({
        image: "",
        name: "",
        description: "",
        price: ""
    })

    const formSchema = Yup.object().shape({
        image: Yup.string()
            .required("Image url is required")
            .url("Must be a valid url"),
        name: Yup.string()
            .required("Name is required"),
        description: Yup.string()
            .required("Description is required"),
        price: Yup.number()
            .required("Price is required")
    });

    const onInputChange = e => {
        e.persist();
        Yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid=>{
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        }).catch(err=>{
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        });

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    const submit = e => {
        e.preventDefault();
        formSchema.isValid(formState).then(valid => {
            if(valid === true){
                setErrors({
                    ...errors,
                    submit: ""
                });

                axios.post("https://reqres.in/api/menu-items", formState).then(({data})=>{
                    console.log(data)
                    closeModal();
                }).catch(err=>{
                    console.log(err)
                });
            } else {
                setErrors({
                    ...errors,
                    submit: "You must fill out all form fields correctly"
                })
            }
        })
    }

    const closeModal = ()=>{
        setFormState({
            image: "",
            name: "",
            description: "",
            price: ""
        });
        props.toggleModal();
    }

    return (
        <Modal isOpen={props.modal}> 
            <ModalHeader>Add Menu Item</ModalHeader>
            <ModalBody>
                <Form onSubmit={submit}>
                    <FormGroup>
                        <Label for="name">Item Name</Label>
                        <Input className={errors.name? "is-invalid": ""} onChange={onInputChange} type="text" id="name" name="name" value={formState.name}/>
                        {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input  className={errors.image? "is-invalid": ""} onChange={onInputChange} type="text" id="image" name="image" value={formState.image}/>
                        {errors.image && <FormFeedback>{errors.image}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Price</Label>
                        <Input  className={errors.price? "is-invalid": ""} onChange={onInputChange} type="number" min="0" step="0.01" id="price" name="price" value={formState.price}/>
                        {errors.price && <FormFeedback>{errors.price}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Description</Label>
                        <Input  className={errors.description? "is-invalid": ""} onChange={onInputChange} type="textarea" id="description" name="description" value={formState.description}/>
                        {errors.description && <FormFeedback>{errors.description}</FormFeedback>}
                    </FormGroup>
                    {errors.submit && <FormText className="bg-danger p-2 mb-2" color="white">{errors.submit}</FormText>}
                    <Button color="primary"> Add Item</Button>
                    <Button onClick={closeModal} color="secondary">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}