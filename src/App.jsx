import { useState } from 'react'

import  Login from './pages/login'

import './index.css'
import './App.css'
import Navbar from './components/Navbar'
import Footer from "./components/footer/Footer";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (<>
    <Navbar/>
    <Routes>
        <Route exact path="/" component="hola" />
      </Routes>
      <Footer/>
  </>
  )
}
export default App
