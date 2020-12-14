import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// // REDUX
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import Thunk from "redux-thunk";
// import { rootReducer } from "./reducers";
import { QueryClient, QueryClientProvider } from 'react-query'

// local components
import App from "./App";

// styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient()

// render to page
ReactDOM.render(
    <QueryClientProvider client={queryClient}>
    <Router>
            <App />
    </Router>
    </QueryClientProvider>,
    document.getElementById("root")
);
