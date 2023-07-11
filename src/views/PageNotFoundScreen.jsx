import errorL from '../assets/error404L.png'
import errorD from '../assets/error404D.png'
import React, { useContext, useState } from "react";
import { UserContext, DarkModeContext } from "../App";
import '../css/error404.css'



const PageNotFoundScreen = () => {
  const {dark}=useContext(DarkModeContext)
  return (
    <>
    <div className={dark ? "bg-black contenedorimagenerror" : "contenedorimagenerror"} >
    <img id='imagenerror' src={dark ? errorD : errorL } alt="imagen de error 404" />
    </div>
    </>
  )
}

export default PageNotFoundScreen