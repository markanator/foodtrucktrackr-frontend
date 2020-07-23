import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Home from "./components/Home";

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
