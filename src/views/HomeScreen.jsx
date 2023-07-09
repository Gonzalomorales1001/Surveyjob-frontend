import React, { useContext } from 'react'
import SpeechBubble from '../components/SpeechBubble'
import { UserContext,DarkModeContext } from "../App";
import HS1D from '../assets/CarruselHS/HS1D.jpg'
import HS2D from '../assets/CarruselHS/HS2D.jpg'
import HS3D from '../assets/CarruselHS/HS3D.jpg'
import HS1L from '../assets/CarruselHS/HS1L.jpg'
import HS2L from '../assets/CarruselHS/HS2L.jpg'
import HS3L from '../assets/CarruselHS/HS3L.jpg'
import LOGO_light from '../assets/DarkLetterLogo.png'
import LOGO_dark from '../assets/LightLetterLogo.png'
import survey from '../assets/survey.svg'
import "../css/HomeScreen.css";
import { Carousel } from 'react-bootstrap';


const HomeScreen = () => {
  const {dark}=useContext(DarkModeContext)

  return (
    <main className={`${dark?'texturized--dark text-light':'texturized--light'} pb-3`}>
      <div className="container mb-3">
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col text-center d-flex justify-content-center align-items-center flex-column">
            <h1>¿Qué es SurveyJob?</h1>
            <p>SurveyJob es un servicio de encuestas digitales en el que podrás crear tus propias encuestas y enviar un enlace para que puedan ser respondidas.</p>
            <p>Es muy sencillo de utilizar y ¡Solo lleva un par de minutos!</p>
            <button className="btn btn-outline-warning rounded-pill">Comenzar</button>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <img src={survey} alt="survey" className="w-100" />
          </div>
        </div>
      </div>
      <div className="black-overlay my-2 py-3">
        <div className="container">
        <div className="row row-cols-1 row-cols-lg-2">
        <div className="col">
          <Carousel slide={true} interval={3000} prevIcon={false} nextIcon={false} indicatorLabels={null}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={dark?HS1D:HS1L}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={dark?HS2D:HS2L}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={dark?HS3D:HS3L}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col d-flex justify-content-center align-content-start align-items-center flex-column text-center pt-3 pt-lg-0">
          <h2>¿Por qué SurveyJob?</h2>
          <p>Porque además de hacer encuestas para tus usuarios, ¡También puedes hacer encuestas públicas para que responda la comunidad de SurveyJob!</p>
        </div>
      </div>
        </div>
      </div>
      <article>
        <header>
          {/* <img className='mx-auto' src={dark?LOGO_dark:LOGO_light} alt="SurveyJob logo" /> */}
        </header>
      </article>
    </main>
  )
}

export default HomeScreen;