import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import App from './App.jsx'
import './index.css'

const httpLink = createHttpLink({
  url: 'http://localhost:3002'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
  <App />
</React.StrictMode>
</ApolloProvider>
  
);
