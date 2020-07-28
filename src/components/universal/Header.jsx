import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions";

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
    // redux user for login
    const isActive = useSelector((state) => state.tempSiteReducer.isActive);
    const rUser = useSelector((state) => state.tempSiteReducer.user);
    const { push } = useHistory();
    const dispatch = useDispatch();

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
            {/* CHECK TO SEE IF USER IS LOGGED IN */}

            {!isActive ? null : rUser.user_role === "diner" ? (
                <>
                    {/* USER IS A DINER */}
                    <Link to="/profile" className="navItem">
                        User Profile
                    </Link>
                    <Link to="/trucks" className="navItem">
                        Trucks
                    </Link>
                </>
            ) : !isActive ? null : (
                <>
                    {/* USER IS A OPERATOR */}
                    <Link to="/operator" className="navItem">
                        Owner Dashboard
                    </Link>
                    <Link to="/trucks" className="navItem">
                        Trucks
                    </Link>
                </>
            )}
            {/* check for username */}
            {!isActive ? (
                // USER NEEDS TO LOG **IN**
                <div tag={Link} className="navItem" onClick={toggle}>
                    Login
                </div>
            ) : (
                // USER CAN LOG **OUT**
                <div
                    tag={Link}
                    className="navItem"
                    onClick={() => {
                        // needs to be cleaner, but works
                        dispatch(actions.logout());
                        push("/");
                    }}
                >
                    Logout
                </div>
            )}
        </Navbar>
    );
};

const Login = ({ modal, toggle }) => {
    const { push } = useHistory();
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        user_email: "",
        password: "",
    });

    const [isloading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // reformating user obj for backend
        const user = {
            user_email: formState.user_email,
            password: formState.password,
        };
        // just for visuals
        setTimeout(() => {
            userLogin(user);
        }, 1000);
    };

    const userLogin = (user) => {
        axios
            .post("http://localhost:5000/user/auth/login", user)
            .then((res) => {
                // set local cookie token to access site
                localStorage.setItem("token", res.data.token);
                // set redux state from payload
                dispatch(actions.login(res.data));
                // reset form
                setFormState({ user_email: "", password: "" });
                // turn off loading text
                setIsLoading(false);
                // get rid of modal
                toggle();
                // move the user to content
                if (res.data.user_role === "diner") {
                    push("/profile");
                } else {
                    push("/operator");
                }
            })
            .catch((err) => {
                console.log(`Error: `, err);
                setIsLoading(false);
            });
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="Username">Email</Label>
                        <Input
                            disabled={isloading}
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
                            disabled={isloading}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="false"
                            value={formState.Password}
                        />
                    </FormGroup>
                    <Button color="primary" type="submit" disabled={isloading}>
                        Login
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </Form>
                {isloading ? (
                    <h3 style={{ textAlign: "center" }}>Loading...</h3>
                ) : null}
            </ModalBody>
        </Modal>
    );
};

export default Header;
