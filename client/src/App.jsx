import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
<<<<<<< HEAD
import Header from './components/header/header'
import Chats from './components/chats/chats'
import About from './components/about/about'
=======
import Home from './pages/home'
import Login from './pages/login'
import SelectedChat from './pages/selectedChat'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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


>>>>>>> a1783ecc6a4be27d4011f8cff40b22611eedca85
function App() {

  return (
    <ApolloProvider client={client}>
    <>
    <div>
<<<<<<< HEAD
      <Header/>
      <Chats/>
      <About/>
=======
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/chat' element={<SelectedChat />}/>
        </Routes>
      </BrowserRouter>
>>>>>>> a1783ecc6a4be27d4011f8cff40b22611eedca85
    </div>
    </>
    </ApolloProvider>
  )
}

export default App
