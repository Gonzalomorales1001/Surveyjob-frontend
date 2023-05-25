import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext,DarkModeContext } from "../App";
import "../css/navbar.css";
import DarkModeSurveyJobLogo from "../assets/LightLetterLogo.png";
import LightModeSurveyJobLogo from "../assets/DarkLetterLogo.png";

const Navbar = ({ToggleDarkMode}) => {

  const {userData,saveUserData}=useContext(UserContext)
  const {dark}=useContext(DarkModeContext)

  const logout=()=>{
    saveUserData(null)
    localStorage.removeItem('userData')
  }
  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary sticky-top ${
          dark ? "navbar-dark" : "navbar-light"
        }`}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand d-flex justify-content-center align-items-center"
            href="#"
          >
            {dark ? (
              <img
                src={DarkModeSurveyJobLogo}
                alt="Survey Job Logo"
                className="navbar-brand__logo"
              />
            ) : (
              <img
                src={LightModeSurveyJobLogo}
                alt="Survey Job Logo"
                className="navbar-brand__logo"
              />
            )}
          </a>
          <input
            type="checkbox"
            id="toggle"
            className="toggle--checkbox"
            onChange={ToggleDarkMode}
            checked={dark}
          />
          <label htmlFor="toggle" className="toggle--label">
            <span className="toggle--label-background"></span>
          </label>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-5">
            {userData?.admin&&(
              <li className="nav-item">
                <NavLink className="nav-link text-danger" to="/admin">
                  Admin
                </NavLink>
              </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contacto
                </NavLink>
              </li>
              {userData?.username?(
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {userData.username}
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={`/user/${userData.userID}`}>Mi perfil</Link></li>
                    <li><Link className="dropdown-item" to='/login' onClick={logout}>Cerrar Sesión</Link></li>
                  </ul>
                </li>
              ):(
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Iniciar Sesión
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
