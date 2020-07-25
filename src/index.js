import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// REDUX
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { rootReducer } from "./reducers";

// local components
import App from "./App";

// styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// helpful redux async debugger
const logger = () => (next) => (action) => {
    console.log("Dispatching: ", action);
    next(action);
};

// redux store w/ async funcs
const store = createStore(rootReducer, applyMiddleware(logger, Thunk));

// render to page
ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById("root")
);
