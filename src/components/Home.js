import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// redux hooks
import { useDispatch } from "react-redux";
// redux actions
import * as actions from "../actions";
// styles
import { Button, Form, FormGroup, Label, Input, ButtonGroup } from "reactstrap";

// local imports
import SearchBar from "./SearchBar";
// connect component to Redux store
import { connect } from "react-redux";

//import login action creator
//import {login} from '../actions';

const Home = ({ users, setUsers }) => {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const defaultState = {
        cSelected: "",
        Email: "",
        Username: "",
        Password: "",
    };

    const [formState, setFormState] = useState({ ...defaultState });

    //form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // reformat the data for backend
        const user = {
            user_role: formState.cSelected,
            user_email: formState.Email,
            username: formState.Username,
            password: formState.Password,
        };

        // simple form validation
        formState.Email === "" ||
        formState.Username === "" ||
        formState.Password === ""
            ? alert("You cannot submit an empty form!")
            : newUser(user);

        console.log(user);
    };

    //data storing
    const handleChange = (e) => {
        const value = e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value,
        });
    };
    //diner/operator button management
    const handleButtonClick = (e) => {
        e.preventDefault();
        setFormState({ ...formState, cSelected: e.target.id });
    };

    const baseURL = "http://localhost:5000";

    //user creation
    const newUser = (user) => {
        axios
            .post(`${baseURL}/user`, user)
            .then((res) => {
                // console.log(res.data);
                //
                if (res.data.user.user_role === "diner") {
                    // set local token
                    localStorage.setItem("token", res.data.token);
                    // set local current user
                    setUsers(res.data.user);
                    // reset formstate
                    setFormState(defaultState);
                    // log account type
                    console.log("user is a DINER!");
                    // using redux hooks => dispatch action >> login
                    dispatch(actions.login(res.data));
                    // push user to profile page
                    push("/profile");
                } else if (res.data.user.user_role === "operator") {
                    // set token
                    localStorage.setItem("token", res.data.token);
                    // st local user
                    setUsers(res.data.user);
                    // reset form
                    setFormState(defaultState);
                    // log account type
                    console.log("user is a OPERATOR!");
                    // using redux hooks => dispatch action >> login
                    dispatch(actions.login(res.data));
                    // send to operator dash
                    push("/operator");
                } else {
                    // set token
                    localStorage.setItem("token", res.data.token);
                    // using redux hooks => dispatch action >> login
                    dispatch(actions.login(res.data));
                    // log response => user
                    console.log("couldn't read data", res.data.user);
                }
            })
            .catch((err) => {
                console.error(err);
                push("/403");
            });
    };

    return (
        <div>
            <SearchBar />

            <h2 className="sign-up">
                <hr />
                Sign Up <hr />
            </h2>

            <Form onSubmit={handleSubmit}>
                <ButtonGroup style={{ marginBottom: "2%" }}>
                    <Button
                        color="primary"
                        id="Diner"
                        onClick={handleButtonClick}
                        active={formState.cSelected === "Diner"}
                    >
                        Diner
                    </Button>
                    <Button
                        color="primary"
                        id="Operator"
                        onClick={handleButtonClick}
                        active={formState.cSelected === "Operator"}
                    >
                        Operator
                    </Button>
                </ButtonGroup>
                <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                        type="email"
                        name="Email"
                        id="Email"
                        onChange={handleChange}
                        value={formState.Email}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Username">Username</Label>
                    <Input
                        type="username"
                        name="Username"
                        id="Username"
                        value={formState.Username}
                        minLength="2"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Password">Password</Label>
                    <Input
                        type="password"
                        name="Password"
                        id="Password"
                        autoComplete="false"
                        value={formState.Password}
                        minLength="5"
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    style={{
                        backgroundColor: "rgb(0, 85, 200)",
                        width: "15%",
                        fontSize: "1.2rem",
                    }}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

// connect component to Redux store
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, {})(Home);

//export default Home;
// commented out ^^^ to connect component to the store
