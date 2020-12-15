/* eslint-disable no-use-before-define */
import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
// import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'react-router-dom';
// import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from './utils/PrivateRoute';
import UserProvider from './context/UserContext';
import ListingsPage from './pages/ListingsPage';

// const queryClient = new QueryClient();

const App = () => (
  // <QueryClientProvider client={queryClient}>
  <>
    <UserProvider>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute exact path="/dashboard/:username">
          <Dashboard />
        </PrivateRoute>
        <Route path="/search-trucks">
          <ListingsPage />
        </Route>
        <Route path="/403" component={Page403} />
        <Route component={Page404} />
      </Switch>
      {/* <ReactQueryDevtools /> */}
    </UserProvider>
  </>
  // </QueryClientProvider>
);

const Page404 = () => (
  <Layout>
    <Container maxW="5xl" py="4rem">
      <Heading as="h1">Error 404!</Heading>
      <Heading as="h3" fontSize="xl">
        The page you requested could not be found!
      </Heading>
    </Container>
  </Layout>
);

const Page403 = () => (
  <Layout>
    <Container maxW="5xl" py="4rem">
      <Heading as="h1">Error 403!</Heading>
      <Heading as="h3" fontSize="xl">
        Thou shalt not pass!
      </Heading>
    </Container>
  </Layout>
);

// default export
export default App;
