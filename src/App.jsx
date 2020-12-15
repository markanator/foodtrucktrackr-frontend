/* eslint-disable no-use-before-define */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from './utils/PrivateRoute';

const App = () => (
  <Layout>
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/dashboard/:username">
          <Dashboard />
        </PrivateRoute>
        <Route path="/403" component={Page403} />
        <Route component={Page404} />
      </Switch>
    </>
  </Layout>
);

const Page404 = () => (
  <Layout>
    <h1>Error 404!</h1>
    <h3>The page you requested could not be found!</h3>
  </Layout>
);

const Page403 = () => (
  <Layout>
    <h1>Error 403!</h1>
    <h3>Thou shalt not pass!</h3>
  </Layout>
);

// default export
export default App;
