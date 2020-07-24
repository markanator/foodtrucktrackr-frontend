import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Home from "./components/Home";
import CreateTruckForm from "./components/CreateTruckForm";
import TruckDetails from "./components/truck_details/TruckDetails";

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers';

//create store
export const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
    return (
        <Layout>
            <div className='App'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path="/add-truck">
                        <CreateTruckForm/>
                    </Route>
                    <Route path="/trucks/:id">
                        <TruckDetails/>
                    </Route>
                </Switch>
            </div>
        </Layout>
    );
};

export default App;
