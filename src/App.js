import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

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

// removed redux to index.js

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

                    <PrivateRoute
                        path="/operator"
                        component={OperatorDashboard}
                    />

                    <PrivateRoute path="/profile" component={DinerDashboard} />

                    {/* <Route exact path="/trucks">
                        <TruckList />
                    </Route> */}

                    {/* <Route path="/add-truck">
                        <CreateTruckForm />
                    </Route> */}

                    {/* <Route path="/search-results">
                        <SearchPage></SearchPage>
                    </Route> */}

                    {/* <Route path="/trucks/:id">
                        <TruckDetails />
                    </Route> */}

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
        <h2>The page you requested could not be found!</h2>
    </>
);

const Page403 = () => (
    <>
        <h1>Error 403!</h1>
        <h2>Thou shalt not pass!</h2>
    </>
);

// default export
export default App;
// other exports
export { Page403, Page404 };
