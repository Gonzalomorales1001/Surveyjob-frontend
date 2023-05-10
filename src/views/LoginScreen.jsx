import React from "react";
import { useNavigate } from "react-router";
import Job from "../assets/job.png";
import "../css/login.css"; //ver si hay que agregar export default

const LoginScreen = ({dark}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`bodylog ${dark?'login__bg--dark':'login__bg--light'}`}>
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className={`signup ${dark?'signup__bg--dark':'signup__bg--light'}`}>
            <form>
              <label htmlFor="chk" className="login__label" aria-hidden="true">
                Regístrate{" "}
              </label>
              <div className="container">
                <input
                  className={`mt-1 login__input ${dark&&'login__input--dark'}`}
                  type="text"
                  name="txt"
                  placeholder="Usuario"
                  required=""
                />
                <input
                  className={`mt-1 login__input ${dark&&'login__input--dark'}`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                />
                <input
                  className={`mt-1 login__input ${dark&&'login__input--dark'}`}
                  type="password"
                  name="pswd"
                  placeholder="Contraseña"
                  required=""
                />
                <small className="login__password__small">Tu contraseña debe tener almenos 1 mayúscula, 1 minúscula, 1 número y almenos 1 símbolo.</small>
              </div>
              <button className={`mt-3 login__btn`}>Registrate</button>
            </form>
          </div>

          <div className={`login ${dark&&'login--dark'}`}>
            <form>
              <label htmlFor="chk" className="login__label" aria-hidden="true">
                Iniciar sesión
              </label>
              <div className="d-flex h-100 align-items-center flex-column pt-3">
              <input
                className="mt-1 login__input"
                type="email"
                name="email"
                placeholder="Email"
                required=""
              />
              <input
                className="mt-1 login__input"
                type="password"
                name="pswd"
                placeholder="Contraseña"
                required=""
              />
              <button className="mt-3 login__btn">Iniciar sesión</button>
              <a href="" className="fs-xs text-warning text-decoration-none"> <small>Olvide mi contraseña</small> </a>

              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className=" d-flex my-5 justify-content-center ">
        <div className="login p-5">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <section>
                  <h1 classNameName="fw-200">
                    Iniciar Sesión en Survey Job{" "}
                    <img src={Job} width="35px" alt="Job letter" />
                  </h1>
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
                    <span>¿Aún no te has registrado?</span>{" "}
                    <button type="button" 
                    data-bs-target="#carouselExample"
                    className="btn" data-bs-slide="prev">
                      Registrate
                    </button>
                    <button type="submit" className=" mx-5 btn btn-primary">
                      Iniciar sesión
                    </button>
                  </form>
                </section>
              </div>
              <div className="carousel-item">
                <section>
                  <h1 classNameName="fw-200">
                    Registrate en Survey Job{" "}
                    <img src={Job} width="35px" alt="Job letter" />
                  </h1>
                  <form>
                    <div className="mb-3">
                      <div className="mb-3">
                        <label
                          for="exampleInputPassword1"
                          className="form-label"
                        >
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
                    <div className="mb-3">
                      <label for="exampleInputPassword2"
                      className="form-label">
                        Confirmar contraseña 
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                      />
                    </div>
                    <span>¿Ya te has registrado?</span>
                    
                    <button type="button" 
                    data-bs-target="#carouselExample"
                    className="btn" data-bs-slide="next">
                      Inicia sesión
                    </button>
                    <button type="submit" className="mx-5 btn btn-primary">
                      Registrate
                    </button>
                  </form>
                </section>
              </div>
            </div>
      </div>
        </div>
      </div> */}
      {/* navigate('/login') */}
    </>
  );
};

export default LoginScreen;
