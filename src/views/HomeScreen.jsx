import React, { useContext, useEffect, useState } from 'react'
import SpeechBubble from '../components/SpeechBubble'
import { UserContext, DarkModeContext } from "../App";
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
import Error500 from '../assets/Error500.svg'
import { InfiniteLoader } from '../components/InfiniteLoader';
import { getSurveys } from '../helpers/SurveyAPI';
import { getCategories } from '../helpers/CategoryAPI';
import Pagination from '../components/Pagination';


const HomeScreen = () => {
  const { dark } = useContext(DarkModeContext)

  const [publicSurveys, setPublicSurveys] = useState(null);
  const [total, setTotal] = useState(null);
  const [categories, setCategories] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationEnabled, setPaginationEnabled] = useState(true);
  const [err, setErr] = useState(false);

  const limit = 5;

  const loadPublicSurveys = async () => {
    setPaginationEnabled(true);
    setPublicSurveys();
    const since = (page - 1) * limit;
    await getSurveys(since, limit, true)
      .then((r) => {
        if (r.errors) { return setErr(true) }
        console.log(r)
        setPublicSurveys(r.surveys);
        setTotal(r.total);
      }).catch((err) => {
        setErr(true);
        console.log(err);
      });
  }

  const loadCategories = async () => {
    const resp = await getCategories();
    setCategories(resp.Categories);
  }

  useEffect(() => {
    loadCategories();
  }, [])

  useEffect(() => {
    loadPublicSurveys();
  }, [page]);


  return (
    <main className={`${dark ? 'texturized--dark text-light' : 'texturized--light'} pb-3`}>
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
                    src={dark ? HS1D : HS1L}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={dark ? HS2D : HS2L}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={dark ? HS3D : HS3L}
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
      {publicSurveys ? (
        <article className="container">
          <header>
            <h2 className="text-center">
              Encuestas públicas
            </h2>
            <div className="input-group mb-3 py-3">
              <select className="form-select" id="inputGroupSelect01">
                <option defaultValue={0}>Selecciona la categoría</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </header>
          <main>
            {publicSurveys.map((survey, index) => (
              <div className={`card mt-3 ${dark && 'card--dark'}`} key={'public-survey-' + index}>
                <h2 className='text-center'>{survey.title}</h2>
                <small className="text-muted d-block">{survey.category}</small>
                <p className="survey-desc">{survey.description}</p>
              </div>
            ))}
          </main>
          <footer>
            <Pagination total={total} page={page} setPage={setPage} elementsPerPage={limit} />
          </footer>
        </article>
      ) : err ? (
        <div className="container">
          <div className='row align-items-center justify-content-center py-4 loading-screen'>
            <img src={Error500} alt="serverless" className='col-12 col-lg-6 w-50' />
            <div className='col-12 col-lg-6 d-flex justify-content-center align-items-center flex-column'>
              <h1 className='text-center text-secondary'>No ha sido posible cargar la información!</h1>
              <h3 className='text-center text-secondary'>¡Lo sentimos! No se ha podido cargar la información de las encuestas.</h3>
              <p className='text-center text-secondary'>Por favor, ponte en contacto con algún administrador</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='container d-flex justify-content-center align-items-start py-5 loading-screen'>
          <div>
            <h1 className='text-center'>Cargando...</h1>
            <InfiniteLoader dark={dark} />
          </div>
        </div>
      )}
    </main>
  )
}

export default HomeScreen;