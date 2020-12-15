/* eslint-disable no-use-before-define */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';

const App = () => (
  <Layout>
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/403" component={Page403} />
        <Route component={Page404} />
      </Switch>
    </div>
  </Layout>
);

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
