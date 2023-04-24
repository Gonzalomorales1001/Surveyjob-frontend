import React, { useEffect, useState } from 'react'
import { getEncuestas } from "../helpers/encuestas";
const TablasMisEncuestas = () => {
const [encuestas, setEncuestas] = useState([])
useEffect(() => {
    const misEncuestas = getEncuestas();
    setEncuestas(misEncuestas);
}, [])

const encuestasFiltradas = encuestas.filter(encuesta=>encuesta.id=== // ver
 )
  return (

  console.log("hola mundo")
  
  )
}

export default TablasMisEncuestas