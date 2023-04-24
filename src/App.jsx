import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RoutsApp from "./routes/RoutsApp";
// import FinalNav from './components/FinalNav'
import FinalAdmin from "./components/FinalAdmin"
import { BrowserRouter, Routes } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <RoutsApp/>    
    </BrowserRouter>
  )
}

export default App
