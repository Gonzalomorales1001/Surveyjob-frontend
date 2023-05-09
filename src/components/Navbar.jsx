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
          <a className="navbar-brand d-flex justify-content-center align-items-center" href="#">
            {dark
            ?<img src={DarkModeSurveyJobLogo} alt="Survey Job Logo" className='navbar-brand__logo'/>
            :<img src={LightModeSurveyJobLogo} alt="Survey Job Logo" className='navbar-brand__logo'/>}
          </a>
          <input type="checkbox" id="toggle" className="toggle--checkbox" onChange={ToggleDarkMode}/>
                <label htmlFor="toggle" className="toggle--label">
                  <span className="toggle--label-background"></span>
                </label>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-5">
              <li className="nav-item">
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