import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react';

// local
import App from './App';
import './index.css';

const queryClient = new QueryClient();

// render to page
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
