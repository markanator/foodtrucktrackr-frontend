import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import { useSelector } from "react-redux";

// layout
import Layout from "./Layout";
import PrivateRoute from "./utils/PrivateRoute";
// local components
import Home from "./components/Home";
import DinerDashboard from "./components/DinerDashboard";
import OperatorDashboard from "./components/OperatorDashboard";
import TruckList from "./components/TruckList";
import CreateTruckForm from "./components/CreateTruckForm";
import TruckDetails from "./components/truck_details/TruckDetails";
import SearchPage from "./components/SearchPage";
import EditTruck from "./components/EditTruck";
import TrucksPage from "./components/TrucksPage";
import EditMenuItem from "./components/truck_details/EditMenuItem";

// removed redux to index.js

const App = () => {
    const [users, setUsers] = useState({});
    const userState = useSelector((state) => state.tempSiteReducer.user);
    return (
        <Layout>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home users={users} setUsers={setUsers} />
                    </Route>
                    <Route path="/login"></Route>
                    {/* PLEASE LOGIN TO VIEW PAGES */}
                    <PrivateRoute
                        path="/operator"
                        component={OperatorDashboard}
                    />
                    <PrivateRoute path="/profile" component={DinerDashboard} />
                    <PrivateRoute exact path="/trucks" component={TrucksPage} />
                    <PrivateRoute path="/trucks/:id" component={TruckDetails} />
                    <PrivateRoute
                        path="/add-truck"
                        component={CreateTruckForm}
                    />
                    <PrivateRoute
                        path="/edit-truck/:id"
                        component={EditTruck}
                    />
                    <PrivateRoute
                        path="/edit-menu-item/:id"
                        component={EditMenuItem}
                    />
                    <PrivateRoute
                        path="/search-results"
                        component={SearchPage}
                    />
                    {/* ^^^ User must be logged in to view these pages ^^^*/}
                    <Route path="/403" component={Page403} />
                    <Route component={Page404} />
                </Switch>
            </div>
        </Layout>
    );
};

const Page404 = () => (
    <>
        <h1>Error 404!</h1>
        <h3>The page you requested could not be found!</h3>
    </>
);

const Page403 = () => (
    <>
        <h1>Error 403!</h1>
        <h3>Thou shalt not pass!</h3>
    </>
);

// default export
export default App;
// other exports
export { Page403, Page404 };
