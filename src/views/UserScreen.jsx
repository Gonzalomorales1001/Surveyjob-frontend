import React, { useState, useEffect, useContext } from "react";
import { URL } from "../helpers/URL";
import "../css/userScreen.css";
import userIcon from '../assets/icons8-usuario-masculino-en-círculo-64.png';
import documentIcon from '../assets/icons8-documento-50.png';
import Error403 from '../assets/Error403.svg'
import { useParams } from 'react-router';
import SurveysCreated from './SurveysCreated';
import { UserContext, DarkModeContext } from "../App";
import { Modal, Button, Row } from 'react-bootstrap'
import SurveyCreator from '../components/SurveyCreator';
import { Link } from 'react-router-dom';
import SurveyCard from '../components/SurveyCard';
import { InfiniteLoader } from '../components/InfiniteLoader';
import noData from '../assets/no-data.svg'
import Error500 from '../assets/Error500.svg'


const UserScreen = () => {
  const { userData } = useContext(UserContext);
  const { dark } = useContext(DarkModeContext);
  const params = useParams();
  const [forbidden, setForbidden] = useState(false);
  const [showSurveyCreator, setShowSurveyCreator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userSurvey, setUserSurvey] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (params.id != userData.userID) {
      setForbidden(true)
    } else {
      getSurveysByUserId()
    }
  }, [])

  const toggleShowSurveyCreator = () => {
    setShowSurveyCreator(!showSurveyCreator);
  };

  useEffect(() => {
    getSurveysByUserId();
  }, []);

  function getSurveysByUserId() {
    fetch(`http://localhost:8080/api/surveys?userId=${params.id}`)
      .then((res) => res.json())
      .then((data) => setUserSurvey(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getSurveysByUserId()
  }, [])

  async function getSurveysByUserId() {
    fetch(`http://localhost:8080/api/surveys?userId=${params.id}`)
      .then(res => res.json())
      .then(data => setUserSurvey(data))
      .catch(err => {
        setErr(true);
        console.error(err);
      })
  }

  return (
    <div className={`${dark ? "texturized--dark" : "texturized--light"}`}>
      <div className="container">
        {forbidden ? (
          <div className="row row-cols-1 row-cols-md-2 justify-content-center align-items-center text-center">
            <div className="col">
              <img src={Error403} alt="Acceso Denegado" className="w-50" />
            </div>
            <div className="col">
              <h1>Lo sentimos, pero no puedes acceder a esta página</h1>
              <div className="alert alert-warning" role="alert">
                Por favor,
                <span className="alert-link">
                  <Link to="/login">Inicia Sesión</Link>
                </span>
                correctamente.
              </div>
              <small>Error 403: Forbidden</small>
            </div>
          </div>
          // </div>
        ) : (
          <>
            <div className='d-flex justify-content-between align-items-center'>
              <h1>Mis encuestas</h1>
              <button className="btn btn-warning rounded-4" onClick={toggleShowSurveyCreator}><i className={`fa ${showSurveyCreator ? 'fa-times' : 'fa-plus'}`} aria-hidden="true"></i> {showSurveyCreator ? 'Cerrar' : 'Nueva Encuesta'}</button>
            </div>
            <hr />
            {showSurveyCreator && (<SurveyCreator getSurveysByUserId={getSurveysByUserId} toggleShowSurveyCreator={toggleShowSurveyCreator} />)}

            {userSurvey ? userSurvey.total != 0 ? (
              <div className="row row-cols-1">
                <div className='col'>{userSurvey.surveys.map(e => <SurveyCard key={e.surveyID} id={e.surveyID} title={e.title} category={e.category} questions={e.questions} answers={e.answers} />)}</div>
              </div>
            ) : (
              <div className='row row-cols-1 row-cols-lg-2 justify-content-center align-items-center'>
                <div className="col d-flex justify-content-center">
                  <img src={noData} className='text-center w-50' alt="Sin información" />
                </div>
                <div className="col text-center">
                  <h2>¡No tienes encuestas creadas!</h2>
                  <p>Puedes añadir nuevas encuestas haciendo click en el boton de "Crear nueva encuesta".
                    Además, puedes compartir el enlace para que tus encuestas sean respondidas y
                    <span className='text-warning'> ¡Aquí podras ver los resultados de tus encuestas! </span></p>
                </div>
              </div>
            )
              :
              err ? (
                <div className='row align-items-center justify-content-center py-4 loading-screen'>
                  <img src={Error500} alt="serverless" className='col-12 col-lg-6 w-50' />
                  <div className='col-12 col-lg-6 d-flex justify-content-center align-items-center flex-column'>
                    <h1 className='text-center text-secondary'>¡No ha sido posible cargar la información!</h1>
                    <h3 className='text-center text-secondary'>¡Ha ocurrido un error inesperado!</h3>
                    <p className='text-center text-secondary'>Por favor, ponte en contacto con algún administrador</p>
                  </div>
                </div>
              ) : (
                <div className='container d-flex justify-content-center align-items-start py-5 loading-screen'>
                  <div>
                    <h1 className='text-center'>Cargando...</h1>
                    <p className='text-center mb-5'>Cargando información del usuario</p>
                    <InfiniteLoader dark={dark} />
                  </div>
                </div>
              )
            }
          </>
        )}
      </div>
    </div>
  );
};

export default UserScreen;
