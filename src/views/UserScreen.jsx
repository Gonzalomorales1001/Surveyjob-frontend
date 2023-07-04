import React, { useState, useEffect, useContext } from 'react';
import { URL } from '../helpers/URL';
import "../css/userScreen.css";
import userIcon from '../assets/icons8-usuario-masculino-en-círculo-64.png';
import documentIcon from '../assets/icons8-documento-50.png';
import Error403 from '../assets/Error403.svg'
import { useParams } from 'react-router';
import SurveysCreated from './SurveysCreated';
import { UserContext,DarkModeContext } from "../App";
import {Modal,Button} from 'react-bootstrap'
import SurveyCreator from '../components/SurveyCreator';
import { Link } from 'react-router-dom';


const UserScreen = () => {
  const {userData}=useContext(UserContext);
  const {dark}=useContext(DarkModeContext);
  const params=useParams();
  const [forbidden, setForbidden] = useState(false);
  const [showSurveyCreator, setShowSurveyCreator] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    company: ''
  });
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    if(params.id!=userData.userID){
      setForbidden(true)
    }
  }, [])

  const toggleShowSurveyCreator=()=>{
    setShowSurveyCreator(!showSurveyCreator);
  }

  return (
    <div className={`${dark?'texturized--dark':'texturized--light'}`}>
      <div className="container">
      {forbidden?(
        <div className='row row-cols-1 row-cols-md-2 justify-content-center align-items-center text-center'>
          <div className="col">
            <img src={Error403} alt='Acceso Denegado' className='w-50' />
          </div>
          <div className="col">
            <h1>Lo sentimos, pero no puedes acceder a esta página</h1>
            <div className="alert alert-warning" role="alert">
              Por favor, <span className='alert-link'><Link to='/login'>Inicia Sesión</Link></span> correctamente.
            </div>
            <small>Error 403: Forbidden</small>
          </div>
        </div>
      ):(
      <>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>Mis encuestas</h1>
          <button className="btn btn-warning rounded-4" onClick={toggleShowSurveyCreator}><i className={`fa ${showSurveyCreator?'fa-times':'fa-plus'}`} aria-hidden="true"></i> {showSurveyCreator?'Cerrar':'Nueva Encuesta'}</button>
        </div>
        <hr />
        {showSurveyCreator&&(<SurveyCreator toggleShowSurveyCreator={toggleShowSurveyCreator} />)}
      </>
      )}
      </div>
    </div>
  )};

  export default UserScreen 