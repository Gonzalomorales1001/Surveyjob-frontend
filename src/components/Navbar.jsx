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
        className={`navbar-expand w-100 bg-body-tertiary sticky-top ${
          dark ? "texturized--dark" : "texturized--light"
        }`}
      >
        <div className="navbar__overlay">
          <div className="nav__logo">
            <Link
              className="navbar-brand d-flex justify-content-center align-items-center"
              to='/'
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
            </Link>
          </div>
          <div className="nav-menu">
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
              <ul className="navbar-nav m-auto d-flex justify-content-center align-items-center">
              {userData?.admin&&(
                <li className="nav-item">
                  <NavLink className={`nav-link ${dark?'nav-link--dark':'nav-link--light'} text-danger`} to="/admin">
                    <i className="fa fa-cogs" aria-hidden="true"></i>
                    <span className="d-none d-md-inline ms-2">Admin</span>
                  </NavLink>
                </li>
                )}
                <li className="nav-item">
                  <NavLink className={`nav-link ${dark?'nav-link--dark':'nav-link--light'}`} aria-current="page" to="/">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span className="d-none d-md-inline ms-2">Inicio</span>
                  </NavLink>
                </li>
                {userData?.username?(
                  <>
                  <li className="nav-item">
                    <NavLink className={`nav-link ${dark?'nav-link--dark':'nav-link--light'}`} aria-current="page" to={`/user/${userData.userID}`}>
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <span className="d-none d-md-inline ms-2">Mi Perfil</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={`nav-link ${dark?'nav-link--dark':'nav-link--light'}`} aria-current="page" to="/login" onClick={logout}>
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                      <span className="d-none d-md-inline ms-2">Cerrar Sesión</span>
                    </NavLink>
                  </li>
                  </>
                ):(
                  <li className="nav-item">
                    <NavLink className={`nav-link ${dark?'nav-link--dark':'nav-link--light'}`} to="/login">
                      <i className="fa fa-sign-in" aria-hidden="true"></i>
                      <span className="d-none d-md-inline ms-2">Iniciar Sesión</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
