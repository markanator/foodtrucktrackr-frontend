import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Form,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <Navbar className="navbar">
            <Login modal={modal} setModal={setModal} toggle={toggle} />
            <div className="navTitle">
                <i className="fas fa-truck"></i>
                <h1 className="headerTitle">Food Truck Trackr</h1>
            </div>
            <Link to="/" className="navItem">
                Home
            </Link>
            <Link to="/profile" className="navItem">
                Profile
            </Link>
            <Link to="/trucks" className="navItem">
                Trucks
            </Link>
            <div tag={Link} className="navItem" onClick={toggle}>
                Login/Sign Up
            </div>
        </Navbar>
    );
};

const Login = ({ modal, toggle }) => {
    const [formState, setFormState] = useState({ Username: "", Password: "" });

    const handleChange = (e) => {
        const value = e.target.value;
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            Username: formState.Username,
            Password: formState.Password,
        };
        userLogin(user);
    };

    const userLogin = (user) => {
        axios
            .post("https://reqres.in/api/users", user)
            .then((res) => {
                console.log(user);
                setFormState({ Username: "", Password: "" });
            })
            .catch((err) => console.log(`Error: `, err));
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="Username">Username</Label>
                        <Input
                            onChange={handleChange}
                            type="username"
                            name="Username"
                            id="Username"
                            value={formState.Username}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input
                            onChange={handleChange}
                            type="password"
                            name="Password"
                            id="Password"
                            value={formState.Password}
                        />
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Login
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default Header;
