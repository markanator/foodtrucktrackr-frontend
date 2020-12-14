import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";import {
    Button,
    Form, FormGroup,
    Input, Label, Modal,
    ModalBody, ModalHeader, Navbar
} from "reactstrap";
import { axiosWithAuth } from "../../utils/AxiosWithAuth";


const Header = (props) => {
    const [modal, setModal] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { push } = useHistory();

    const toggle = () => setModal(!modal);

    const renderUserLinks = () => (
        <>
            {/* USER IS A DINER */}
            <Link to="/profile" className="navItem">
                User Profile
            </Link>
            <Link to="/trucks" className="navItem">
                Trucks
            </Link>
        </>
    );
    const renderOperatorLinks = () => (
        <>
            {/* USER IS A OPERATOR */}
            <Link to="/operator" className="navItem">
                Owner Dashboard
            </Link>
            <Link to="/trucks" className="navItem">
                Trucks
            </Link>
        </>
    );

    const LogLinks = () => {
        return !isActive ? (
            // USER NEEDS TO LOG **IN**
            <button tag={Link} className="navItem" onClick={toggle}>
                Login
            </button>
        ) : (
            // USER CAN LOG **OUT**
            <div
                tag={Link}
                className="navItem"
                onClick={() => {
                    push("/");
                }}
            >
                Logout
            </div>
        );
    };

    return (
        <Navbar className="navbar-wrapper">
            <div className="navbar-container">
                <Login modal={modal} setModal={setModal} toggle={toggle} />
                <div className="navTitle">
                    <i className="fas fa-truck"></i>
                    <h1 className="headerTitle"> Food Truck Trackr</h1>
                </div>
                <div className="nav-links">
                    <Link to="/" className="navItem">
                        Home
                    </Link>
                    {!isActive ? null :  renderUserLinks() }
                    {LogLinks()}
                </div>
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

    // used to inform user site is loading
    const [isLoading, setIsLoading] = useState(false);
    // used to inform the user of login errors
    const [error, setError] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError([]);
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

    // main axios request
    const userLogin = (user) => {
        axiosWithAuth()
            .post(`${process.env.REACT_APP_HOSTED_BACKEND}/user/auth/login`, user)
            .then((res) => {
                // set local cookie token to access site
                localStorage.setItem("token", res.data.token);
                setFormState({ user_email: "", password: "" });
                setIsLoading(false);
                toggle();
                const role = res.data.user.user_role;

                if (role === "diner") {
                    push("/profile");
                } else {
                    push("/operator");
                }
            })
            .catch((err) => {
                // console.log(`Error: `, err);
                setError(err.message);
                setIsLoading(false);

                setTimeout(() => {
                    setError([]);
                }, 2000);
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="false"
                            value={formState.Password}
                        />
                    </FormGroup>
                    <Button color="primary" type="submit" disabled={isLoading}>
                        Login
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </Form>
                {isLoading ? (
                    <h3 style={{ textAlign: "center" }}>Loading...</h3>
                ) : null}
                {error.length > 0 ? <p>Error: {error}</p> : null}
            </ModalBody>
        </Modal>
    );
};

export default Header;
