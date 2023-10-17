import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import Chats from './components/chats/chats'
import About from './components/about/about'
import Home from './pages/home'
import Login from './pages/login'
import SelectedChat from './pages/selectedChat'

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
    <>
    <div>
      <Header/>
      <Chats/>
      <About/>
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
  )
}

export default App
