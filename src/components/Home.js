import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, Form, FormGroup, Input, Label } from "reactstrap";
// local imports
import SearchBar from "./SearchBar";


const Home = ({ users, setUsers }) => {
    // const dispatch = useDispatch();
    const { push } = useHistory();
    // const userState = useSelector((state) => state.dinerOperatorReducer);
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

        // console.log(user);
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

    const baseURL = "https://foodtrackertcr.herokuapp.com";

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
                    push("/operator");
                } else {
                    // set token
                    localStorage.setItem("token", res.data.token);
                    console.log("couldn't read data");
                }
            })
            .catch((err) => {
                console.error(err);
                push("/403");
            });
    };

    const renderSignUp = () => (
        <>
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
        </>
    );

    // const tokenExists = () => localStorage.getItem("token");

    return (
        <div>
            <SearchBar />
            {renderSignUp()}
        </div>
    );
};

export default Home;
