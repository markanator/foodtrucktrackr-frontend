import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Home from "./components/Home";
import CreateTruckForm from "./components/CreateTruckForm";
import TrucksPage from "./components/TrucksPage";

import "./App.css";

const App = () => {
    const [users, setUsers] = useState([]);
    return (
        <Layout>
            {/* <Header /> */}
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home users={users} setUsers={setUsers} />
                    </Route>
                    <Route path="/add-truck">
                        <CreateTruckForm />
                    </Route>
                    <Route path="/trucks">
                        <TrucksPage />
                    </Route>
                    <Route path="/login"></Route>
                </Switch>
            </div>
            {/* <Footer /> */}
        </Layout>
    );
};

export default App;
