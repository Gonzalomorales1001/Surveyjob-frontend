import { useState } from 'react'
import './index.css'
import './App.css'
import RoutsApp from "./routes/RoutsApp";
// import FinalNav from './components/FinalNav'
function App() {
  const [count, setCount] = useState(0)

  return (
        <RoutsApp/>    
      )
}
export default App
