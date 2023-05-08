import React from "react";
import { useNavigate } from "react-router";
import Job from "../assets/job.png";

const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      
      <div className=" d-flex my-5 justify-content-center col-12">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
            <section>
            <h1 classNameName='fw-200'>Iniciar Sesión en Survey Job <img src={Job} width="35px" alt='Job letter'/></h1>
              <form>
                <div className="mt-5 mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email 
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                  Nunca compartiremos su correo electrónico con nadie más.
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Recordar usuario
                  </label>
                </div>
                 <span>¿Aún no te has registrado?</span> <button type="button" className="btn" data-bs-slide="prev">
                   Registrate{/* agregar como btn a registrate  */}
                 </button>
                <button type="submit" className=" mx-5 btn btn-primary">
                Iniciar sesión
                </button>
              </form>
              </section>
            </div>
            <div className="carousel-item">
              <section>
            <h1 classNameName='fw-200'>Registrate en Survey Job <img src={Job} width="35px" alt='Job letter'/></h1>
              <form>
                <div className="mb-3">
                  
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                  <label for="exampleInputEmail1" className="form-label">
                    Email 
                  </label>
                  
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                  Nunca compartiremos su correo electrónico con nadie más.
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <span>¿Ya te has registrado?</span>{/* agregar como btn a Iniciar sesión  */}
                <button type="button" className="btn" data-bs-slide="prev">
                Inicia sesión
                </button>
                <button type="submit" className="mx-5 btn btn-primary">
                  Registrate
                </button>
              </form>
              </section>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon "
              aria-hidden="true"
            >asdasdasd</span>
            <span className="visually-hidden">asdasdasdasd</span>
          </button>
        </div>
      </div>
      {/* navigate('/login') */}
    </>
  );
};

export default LoginScreen;
