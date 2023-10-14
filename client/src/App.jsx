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

>>>>>>> a1783ecc6a4be27d4011f8cff40b22611eedca85
function App() {

  return (
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
  )
}

export default App
