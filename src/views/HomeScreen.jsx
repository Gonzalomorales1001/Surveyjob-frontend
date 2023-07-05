import React, { useContext } from 'react'
import SpeechBubble from '../components/SpeechBubble'
import { UserContext,DarkModeContext } from "../App";
import HS1D from '../assets/CarruselHS/HS1D.jpg'
import HS2D from '../assets/CarruselHS/HS2D.jpg'
import HS3D from '../assets/CarruselHS/HS3D.jpg'
import HS1L from '../assets/CarruselHS/HS1L.jpg'
import HS2L from '../assets/CarruselHS/HS2L.jpg'
import HS3L from '../assets/CarruselHS/HS3L.jpg'
import "../css/HomeScreen.css";


const HomeScreen = () => {
  const {dark}=useContext(DarkModeContext)

  return (
    <>
    <section className={`${dark&&'bg-dark text-light'}`}>
      <h1>Bienvenido a SurveyJob</h1>
    </section>
    <section id="carruselImg">
     <div
       id="carousel"
       className="carousel slide carousel-fade"
       data-bs-ride="carousel"
       data-bs-pause="off"
     >
       <div className="carousel-inner">
         <div className="carousel-item active">
           <img
             src={HS1D}
             className="d-block w-100"
             alt="imagen 1"
           />
         </div>
         <div className="carousel-item">
           <img
             src={HS2D}
             className="d-block w-100"
             alt="imagen 2"
           />
         </div>
         <div className="carousel-item">
           <img
             src={HS3D}
             className="d-block w-100"
             alt="imagen 3"
           />
         </div>
         <div className="overlaycarrusel">
           <div className="container h-100">
             <div className="row h-100 align-items-center">
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
   <section id="carruselImg">
     <div
       id="carousel"
       className="carousel slide carousel-fade"
       data-bs-ride="carousel"
       data-bs-pause="off"
     >
       <div className="carousel-inner">
         <div className="carousel-item active">
           <img
             src={HS1L}
             className="d-block w-100"
             alt="imagen 1"
           />
         </div>
         <div className="carousel-item">
           <img
             src={HS2L}
             className="d-block w-100"
             alt="imagen 2"
           />
         </div>
         <div className="carousel-item">
           <img
             src={HS3L}
             className="d-block w-100"
             alt="imagen 3"
           />
         </div>
         <div className="overlaycarrusel">
           <div className="container h-100">
             <div className="row h-100 align-items-center">
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
    </>
  )
}

export default HomeScreen;