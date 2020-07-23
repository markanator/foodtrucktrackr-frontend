import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Home from "./components/Home";

import { createStore } from 'redux';
import { reducer } from './reducers';

//create store
export const store = createStore(reducer);

const App = () => {
    return (
        <Layout>
            <div className='App'>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Layout>
    );
};

export default App;
