import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.2.png";

const user = {
  rol: "ADMIN",
  
};
console.log(user)
const Navbar = () => {
  return (
    <>
      <nav className="">
        <div className="navbar navbar-expand-lg bg-light d-flex justify-content-around">
          <div className="container ">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="SUVERYJOB" className="logo" />
            </a>
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
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="/">
                    Mis Encuestas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " to="/planes">
                    Planes
                  </NavLink>
                </li>
                {user.rol === "ADMIN" && ( //ver si funciona dependiendo del nombre del admin en BD
                  <li className="nav-item">
                    <NavLink className="nav-link p-2" to="/admin">
                      Admin
                    </NavLink>
                  </li>
                )}
                <li className="nav-item ">
                  <button
                    // onClick={cambiarLogin}
                    className="btn btn-outline p-2  "
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
