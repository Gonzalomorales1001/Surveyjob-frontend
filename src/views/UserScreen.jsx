import React, { useState, useEffect } from 'react';
import { URL } from '../helpers/URL';
import "../css/userScreen.css";
import userIcon from '../assets/icons8-usuario-masculino-en-círculo-64.png';
import documentIcon from '../assets/icons8-documento-50.png';
import { useParams } from 'react-router';

//import { UserContext,DarkModeContext } from "../App";


const UserScreen = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    company: ''
  });

  const params=useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/' + params.id);
        const data = await response.json();
        console.log(data);

        // Actualizar el estado con los datos del usuario
        setUserInfo({
          username: data.userFoundByID.username,
          email: data.userFoundByID.email,
          company: data.userFoundByID.company
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={userIcon} 
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
        </a>
      </div>
      <div className="datos">
      <p className='flex'>Nombre: {userInfo.username}</p>
      <p className='flex'>Mail: {userInfo.email}</p>
      <p className='flex'>Empresa: {userInfo.company}</p>
      </div>
      <div className="card-group">
        <div className="card">
          <img
            src={documentIcon}
            className="card-img-top"
            alt="..."
            height="50"
            width="50"
          />
          <div className="card-body">
            <h5 className="card-title">Encuestas</h5>
            <p className="card-text">Encuestas creadas por el usuario</p>
          </div>
        </div>
        <div className="card">
        <img
            src={documentIcon}
            className="card-img-top"
            alt="..."
            height="50"
            width="50"
            />
          <div className="card-body">
            <h5 className="card-title">Encuestas respondidas</h5>
            <p className="card-text">Encuestas respondidas por el usuario</p>
          </div>
        </div>
        <div className="card">
        <img
            src={documentIcon}
            className="card-img-top"
            alt="..."
            height="50"
            width="50"
        />
        
          <div className="card-body">
            <h5 className="card-title">Respuestas</h5>
            <p className="card-text">Respuestas del usuario</p>
          </div>
        </div>
      </div>
      <br />
      <hr />
  
      <h2 className="encuesta-nueva">Prueba crear tu primera encuesta</h2>
      <h4 className="crear-encuesta">Crear encuesta</h4>
    </div>
  )};

  export default UserScreen 