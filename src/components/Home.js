import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, ButtonGroup } from "reactstrap";
import axios from "axios";
import SearchBar from "./SearchBar";
// connect component to Redux store
import { connect } from 'react-redux';

//import login action creator
//import {login} from '../actions';

const Home = ({ users, setUsers }) => {
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
        const user = {
            cSelected: formState.cSelected,
            Email: formState.Email,
            Username: formState.Username,
            Password: formState.Password,
        };
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

    //user creation
    const newUser = (user) => {
        axios
            .post("https://reqres.in/api/users", user)
            .then((res) => {
                setUsers([...users, res.data]);
                console.log([...users, res.data]);
                setFormState(defaultState);
            })
            .catch((err) => console.log(`Error: `, err));
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
                        value={formState.Password}
                        minLength="5"
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button
                    id="btn"
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
const mapStateToProps = state => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps, {})(Home);

//export default Home;
// commented out ^^^ to connect component to the store