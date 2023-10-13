import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
function App() {

  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
