import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from "./components/footer/Footer";
import { Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

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
