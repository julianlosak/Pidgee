import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import SelectedChat from './pages/selectedChat'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
    <>
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/chat' element={<SelectedChat />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
    </ApolloProvider>
  )
}

export default App
