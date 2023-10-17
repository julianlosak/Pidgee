import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/header/header'
import Chats from './components/chats/chats'
import About from './components/about/about'
import Home from './pages/home'
import Login from './pages/login'
import SelectedChat from './pages/selectedChat'

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
