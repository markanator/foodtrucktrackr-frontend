/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // if token, render component
      localStorage.getItem('token') ? (
        children
      ) : (
        // If NOT logged in =>
        // change first link to whatever we want
        <Redirect to="/403" />
      )
    }
  />
);

export default PrivateRoute;
