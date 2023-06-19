import React from 'react'
import { UserContext, DarkModeContext } from "../App";
import errorL from '../assets/error404L.jpg'
import errorD from '../assets/error404D.png'



const PageNotFoundScreen = () => {
  const {dark}=useContext(DarkModeContext)

  return (
    <img src={dark ? errorD : errorL } alt="error 404" />
  )
}

export default PageNotFoundScreen