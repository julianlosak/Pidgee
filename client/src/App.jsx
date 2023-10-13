import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'

function App() {

  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
