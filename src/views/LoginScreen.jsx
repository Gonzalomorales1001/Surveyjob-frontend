import React, { useState } from "react";
import { useNavigate } from "react-router";
import Job from "../assets/job.png";
import "../css/login.css"; //ver si hay que agregar export default
import { useForm } from "react-hook-form";

const LoginScreen = ({dark}) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    loginEmail:'',
    loginPassword:''
  })
  const [registerData, setRegisterData] = useState({
    registerUsername:'',
    registerEmail:'',
    registerPassword:'',
    confirmPassword:''
  })

  const handleLoginInputs=(e)=>{
    setLoginData({
      ...loginData,
      [e.target.name]:e.target.value
    })
  }

  const handleRegisterInputs=(e)=>{
    setRegisterData({
      ...registerData,
      [e.target.name]:e.target.value
    })
  }

  const handleForms=(e)=>{
    e.preventDefault()
  }

  return (
    <>
      <div className={`bodylog ${dark?'login__bg--dark':'login__bg--light'}`}>
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className={`signup ${dark?'signup__bg--dark':'signup__bg--light'}`}>
            <form>
              <label htmlFor="chk" className="login__label" aria-hidden="true">
                Iniciar sesión
              </label>
              <div className="d-flex h-100 align-items-center flex-column pt-3">
              <input
                className="mt-1 login__input"
                type="email"
                name="loginEmail"
                value={loginData.loginEmail}
                placeholder="Email"
                required={true}
                onChange={handleLoginInputs}
                />
              <input
                className="mt-1 login__input"
                type="password"
                name="loginPassword"
                value={loginData.loginPassword}
                placeholder="Contraseña"
                required={true}
                onChange={handleLoginInputs}
                />
              <button className="mt-3 login__btn">Iniciar sesión</button>
              {/* <input type="submit" value="Iniciar Sesion" className="mt-3 login__btn" /> */}
              <a href="" className={`fs-xs ${!dark&&'text-light'} text-decoration-none`}> <small>Olvide mi contraseña</small> </a>

              </div>
            </form>
          </div>

          <div className={`login ${dark&&'login--dark'}`}>
          <form>
              <label htmlFor="chk" className="login__label" aria-hidden="true">
                Regístrate{" "}
              </label>
              <div className="container">
                <input
                  className={`mt-1 login__input ${dark&&'login__input--dark'}`}
                  type="text"
                  name="registerUsername"
                  value={registerData.registerUsername}
                  onChange={handleRegisterInputs}
                  placeholder="Usuario"
                  required=""
                  />
                <input
                  className={`mt-1 login__input ${dark&&'login__input--dark'}`}
                  type="email"
                  name="registerEmail"
                  value={registerData.registerEmail}
                  onChange={handleRegisterInputs}
                  placeholder="Email"
                  required=""
                />
                <input
                  className={`mt-1 login__input ${dark&&'login__input--dark'}`}
                  type="password"
                  name="registerPassword"
                  value={registerData.registerPassword}
                  onChange={handleRegisterInputs}
                  placeholder="Contraseña"
                  required=""
                />
                <input
                  className={`mt-1 login__input ${dark&&'login__input--dark'}`}
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterInputs}
                  placeholder="Contraseña"
                  required=""
                />
                <small className="login__password__small">Tu contraseña debe tener almenos 1 mayúscula, 1 minúscula, 1 número y almenos 1 símbolo.</small>
              </div>
              <button className={`mt-3 login__btn`}>Registrate</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
