import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

// layout
import Layout from "./Layout";
// local components
import Home from "./components/Home";
import DinerDashboard from "./components/DinerDashboard";
import OperatorDashboard from "./components/OperatorDashboard";
import TruckList from "./components/TruckList";
import CreateTruckForm from "./components/CreateTruckForm";
import TruckDetails from "./components/truck_details/TruckDetails";
import SearchPage from "./components/SearchPage";

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

//create store
export const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
    const [users, setUsers] = useState([]);
    return (
        <Layout>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home users={users} setUsers={setUsers} />
                    </Route>
                    <Route path="/login"></Route>
                    <Route path="/operator">
                        <OperatorDashboard />
                    </Route>
                    <Route path="/profile">
                        <DinerDashboard />
                    </Route>
                    <Route exact path="/trucks">
                        <TruckList />
                    </Route>
                    <Route path="/add-truck">
                        <CreateTruckForm />
                    </Route>
                    <Route path="/search-results">
                        <SearchPage></SearchPage>
                    </Route>
                    <Route path="/trucks/:id">
                        <TruckDetails />
                    </Route>
                </Switch>
            </div>
        </Layout>
    );
};

export default App;
