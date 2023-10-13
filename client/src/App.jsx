import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/header/header'
import Chats from './components/chats/chats'
import About from './components/about/about'
function App() {

  return (
    <>
    <div>
      <Header/>
      <Chats/>
      <About/>
    </div>
    </>
  )
}

export default App
