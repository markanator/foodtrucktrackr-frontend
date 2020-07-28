import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
    Navbar,
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Input,
    Form,
} from "reactstrap";

const Header = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <Navbar className="navbar">
            <Login modal={modal} setModal={setModal} toggle={toggle} />
            <div className="navTitle">
                <i className="fas fa-truck"></i>
                <h1 className="headerTitle"> Food Truck Trackr</h1>
            </div>
            <Link to="/" className="navItem">
                Home
            </Link>
            {/* WILL BE WRAPPED IN LOGIC */}
            {/*         DINER || OPERATOR       */}
            <Link to="/profile" className="navItem">
                User Profile
            </Link>
            <Link to="/operator" className="navItem">
                Owner Dashboard
            </Link>
            {/*         END USER TYPE LOGIC         */}
            <Link to="/trucks" className="navItem">
                Trucks
            </Link>
            {/* END LOGIC */}
            <div tag={Link} className="navItem" onClick={toggle}>
                Login
            </div>
        </Navbar>
    );
};

const Login = ({ modal, toggle }) => {
    const { push } = useHistory();
    const [formState, setFormState] = useState({
        user_email: "",
        password: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // reformating user obj for backend
        const user = {
            user_email: formState.user_email,
            password: formState.password,
        };
        userLogin(user);
    };

    const userLogin = (user) => {
        axios
            .post("http://localhost:5000/user/auth/login", user)
            .then((res) => {
                // console.log(res);
                // set local cookie for AUTH
                localStorage.setItem("token", res.data.token);
                // setFormState({ user_email: "", password: "" });
                push();
            })
            .catch((err) => console.log(`Error: `, err));
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="Username">Email</Label>
                        <Input
                            onChange={handleChange}
                            type="email"
                            name="user_email"
                            id="user_email"
                            value={formState.user_email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            id="password"
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
