import { useState } from 'react'

import  Login from './pages/login'

import './index.css'
import './App.css'
import RoutsApp from "./routes/RoutsApp";
// import FinalNav from './components/FinalNav'
import FinalAdmin from "./components/FinalAdmin"
import { BrowserRouter, Routes } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    
    <RoutsApp/>    
    
  )
}
export default App
