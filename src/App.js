import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/universal/Footer";
import Header from "./components/universal/Header";
import CreateTruckForm from "./components/CreateTruckForm";
import TruckDetails from "./components/truck_details/TruckDetails";

const App = () => {
    const [users, setUsers] = useState([]);
    return (
        <div>
            <Header />
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home users={users} setUsers={setUsers} />
                    </Route>
                    <Route path="/login"></Route>
                    <Route path="/add-truck">
                        <CreateTruckForm/>
                    </Route>
                    <Route path="/trucks/:id">
                        <TruckDetails/>
                    </Route>
                </Switch>
            </div>
            <Footer />
        </div>
    );
};

export default App;
