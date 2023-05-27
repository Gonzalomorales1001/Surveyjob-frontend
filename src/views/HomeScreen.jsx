import React, { useContext } from 'react'
import SpeechBubble from '../components/SpeechBubble'
import { UserContext,DarkModeContext } from "../App";
import HS1 from '../assets/CarruselHS/HS1.jpg'
import HS2 from '../assets/CarruselHS/HS2.jpg'
import HS3 from '../assets/CarruselHS/HS3.jpg'
import HS4 from '../assets/CarruselHS/HS4.jpeg'
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
             src={HS1}
             className="d-block w-100"
             alt="imagen 1"
           />
         </div>
         <div className="carousel-item">
           <img
             src={HS2}
             className="d-block w-100"
             alt="imagen 2"
           />
         </div>
         <div className="carousel-item">
           <img
             src={HS3}
             className="d-block w-100"
             alt="imagen 3"
           />
         </div>
         <div className="carousel-item">
           <img
             src={HS4}
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