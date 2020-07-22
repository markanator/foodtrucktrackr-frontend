import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                // if token, render component
                localStorage.getItem("token") ? (
                    <Component {...props} />
                ) : (
                    // If NOT logged in =>
                    // change first link to whatever we want
                    ((<Redirect to='/dashboard' />),
                    console.log("redirecting..."))
                )
            }
        />
    );
};

export default PrivateRoute;
