import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import FinalNav from './components/FinalNav'
import FinalAdmin from "./components/FinalAdmin"
function App() {
  const [count, setCount] = useState(0)

  return (
    <FinalAdmin/>
  )
}

export default App
