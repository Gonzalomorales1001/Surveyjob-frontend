import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import '../css/navbar.css'
import DarkModeSurveyJobLogo from '../assets/LightLetterLogo.png'
import LightModeSurveyJobLogo from '../assets/DarkLetterLogo.png'


const Navbar = ({dark, ToggleDarkMode}) => {
  return (
    <header>
      <nav className={`navbar navbar-expand-lg bg-body-tertiary sticky-top ${dark?'navbar-dark':'navbar-light'}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {dark
            ?<img src={DarkModeSurveyJobLogo} alt="Survey Job Logo" className='navbar-brand__logo'/>
            :<img src={LightModeSurveyJobLogo} alt="Survey Job Logo" className='navbar-brand__logo'/>}
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-5">
              <li className="form-check form-switch">
                <input className="form-check-input form-check-input-sm" type="checkbox" role="switch" onChange={ToggleDarkMode}/>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contacto</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-danger" to="/admin">Admin</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar