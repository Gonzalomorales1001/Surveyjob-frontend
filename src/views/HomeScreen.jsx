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
import "../css/home.css";
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
          <h2 className="text-center">
            Encuestas públicas
          </h2>
          <div className="input-group mb-3 py-3">
  <select className="form-select" id="inputGroupSelect01">
    <option selected>Selecciona la categoría</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</div>
        </header>
        <main className='container'>
          <div className={`survey-card ${dark?'survey-card--dark':'survey-card--light'}`}>
            <h2 className='text-center'>Titulo de la encuesta</h2>
            <small className="text-muted d-block">Categoría</small>
            <p className="survey-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem culpa similique dignissimos rem porro ab aperiam perferendis, iste architecto non.</p>
          </div>
          <div className='container py-5'>
          <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item disabled">
      <a className="page-link">Previous</a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
          </div>

        </main>
        <footer>
        </footer>
      </article>
    </main>
  )
}

export default HomeScreen;