import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.2.png";

const user = {
  rol: "ADMIN",
  
};
const Navbar = ({login}) => {
  return (
    <>
      <nav className="">
        <div className="navbar navbar-expand-lg bg-light d-flex justify-content-around">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="SUVERYJOB" className="logo" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mt-2 ms-auto">
                {user.admin && ( //ver si funciona dependiendo del nombre del admin en BD
                  <li className="nav-item text-danger-emphasis">
                    <NavLink className="nav-link p-2" to="/admin">
                      Administracion
                    </NavLink>
                  </li>
                )}
                {login?(<li className="nav-item ">
                <div className="btn-group dropdown-center">
                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Nombre de usuario
                    </button>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="/profile">Mi perfil</NavLink></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li><NavLink className="dropdown-item" to="/login">Cerrar Sesión</NavLink></li>
                    </ul>
                  </div>
                </li>):(
                  <li className="nav-item">
                  <NavLink className="nav-link p-2" to="/login">
                    Iniciar Sesión
                  </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
