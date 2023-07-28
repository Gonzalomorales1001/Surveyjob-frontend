import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Job from "../assets/job.png";
import "../css/login.css"; //ver si hay que agregar export default
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { login, requestNewPassword } from '../helpers/AuthAPI'
import { register } from '../helpers/UserAPI'
import { UserContext, DarkModeContext } from "../App";
import SurveyJobLogo from '../assets/LightLetterLogo.png'

const LoginScreen = () => {
  const { saveUserData } = useContext(UserContext)
  const { dark } = useContext(DarkModeContext)
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    loginEmail: '',
    loginPassword: ''
  })
  const [registerData, setRegisterData] = useState({
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword: ''
  })
  const [visiblePassword, setVisiblePassword] = useState(false)
  const viewPassword = (e) => {
    e.preventDefault()
    setVisiblePassword(!visiblePassword)
  }

  const forgottenPassword = async (e) => {
    e.preventDefault()
    const { value: email } = await Swal.fire({
      icon: 'question',
      title: '¿Has olvidado tu contraseña?',
      input: 'email',
      inputLabel: 'Te enviaremos un mail para reestablecer contraseña',
      inputPlaceholder: 'Tu email',
      validationMessage: 'El correo electrónico ingresado no es válido.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })

    if (email) {
      try {
        const requestResp = await requestNewPassword({ email })
        Swal.fire({
          icon: 'info',
          title: requestResp.msg
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error
        })
      }
    }
  }

  const handleLoginInputs = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegisterInputs = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const loginUser = async (loginRequestData) => {
    const loginResp = await login(loginRequestData)
    if (loginResp?.token) {
      localStorage.setItem('x-token', JSON.stringify(loginResp.token))
      saveUserData(loginResp.user)
      Toast.fire({
        icon: 'success',
        title: `Bienvenido, ${loginResp.user.username}`,
      })
      navigate(`/user/${loginResp.user.userID}`)
    } else {
      Swal.fire({
        icon: 'error',
        title: loginResp.msg,
      })
    }
  }

  const loginSubmit = async (e) => {
    e.preventDefault()
    const loginRequestData = {
      email: loginData.loginEmail,
      password: loginData.loginPassword
    }
    loginUser(loginRequestData)
  }

  const registerSubmit = async (e) => {
    e.preventDefault()
    if (registerData.registerPassword != registerData.confirmPassword) {
      return Swal.fire({
        icon: 'warning',
        title: 'Las contraseñas no coinciden',
      })
    }
    const registerRequestData = {
      username: registerData.registerUsername,
      email: registerData.registerEmail,
      password: registerData.registerPassword,
    }
    const registerResp = await register(registerRequestData)

    if (registerResp?.newUser) {
      alert('Usuario registrado con éxito')
      const loginRequestData = {
        email: registerData.registerEmail,
        password: registerData.registerPassword
      }
      loginUser(loginRequestData)
    } else {
      console.log(registerResp)
      Swal.fire({
        icon: 'error',
        text: registerResp.errors[0].msg
      })
    }
  }

  return (
    <>
      <main className={`bodylog ${dark ? 'texturized--dark' : 'texturized--light'}`}>
        <section className="login-section">
          <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className={`signup ${dark ? 'signup__bg--dark' : 'signup__bg--light'}`}>
              <form onSubmit={loginSubmit}>
                <label htmlFor="chk" className="login__label" aria-hidden="true">
                  Iniciar sesión
                </label>
                <div className="d-flex h-100 align-items-center flex-column pt-3">
                  <div className='w-100'>
                    <input
                      className="mt-1 login__input"
                      type="email"
                      name="loginEmail"
                      value={loginData.loginEmail}
                      placeholder="Email"
                      required={true}
                      onChange={handleLoginInputs}
                    />
                  </div>
                  <div className='w-100'>
                    <input
                      className="mt-1 login__input"
                      type={visiblePassword ? 'text' : 'password'}
                      name="loginPassword"
                      value={loginData.loginPassword}
                      placeholder="Contraseña"
                      required={true}
                      onChange={handleLoginInputs}
                    />
                  </div>
                  <div>
                    <button onClick={viewPassword} className="btn btn-link text-decoration-none btn-sm"><i className={`fa fa-eye${visiblePassword ? '-slash' : ''}`}></i> {`${visiblePassword ? 'Ocultar ' : 'Mostrar '}`}Contraseña</button>
                  </div>
                  <button className="mt-3 login__btn" type="submit">Iniciar sesión</button>
                  {/* <input type="submit" value="Iniciar Sesion" className="mt-3 login__btn" /> */}
                  <button className={`fs-xs ${!dark && 'text-light'} text-decoration-none btn btn-link`} onClick={forgottenPassword}> <small>Olvide mi contraseña</small> </button>
                </div>
              </form>
            </div>
            <div className={`login ${dark && 'login--dark'}`}>
              <form onSubmit={registerSubmit}>
                <label htmlFor="chk" className="login__label" aria-hidden="true">
                  Regístrate{" "}
                </label>
                <div className="container">
                  <div className='w-100'>
                    <input
                      className={`mt-1 login__input ${dark && 'login__input--dark'}`}
                      type="text"
                      name="registerUsername"
                      value={registerData.registerUsername}
                      onChange={handleRegisterInputs}
                      placeholder="Usuario"
                      required=""
                    />
                  </div>
                  <div className='w-100'>
                    <input
                      className={`mt-1 login__input ${dark && 'login__input--dark'}`}
                      type="email"
                      name="registerEmail"
                      value={registerData.registerEmail}
                      onChange={handleRegisterInputs}
                      placeholder="Email"
                      required=""
                    />
                  </div>
                  <div className='w-100'>
                    <input
                      className={`mt-1 login__input ${dark && 'login__input--dark'}`}
                      type={visiblePassword ? 'text' : 'password'}
                      name="registerPassword"
                      value={registerData.registerPassword}
                      onChange={handleRegisterInputs}
                      placeholder="Contraseña"
                      required=""
                    />
                  </div>
                  <div className='w-100'>
                    <input
                      className={`mt-1 login__input ${dark && 'login__input--dark'}`}
                      type={visiblePassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterInputs}
                      placeholder="Confirmar Contraseña"
                      required=""
                    />
                  </div>
                  <div>
                    <button onClick={viewPassword} className="btn btn-link text-decoration-none btn-sm mb-2"><i className={`fa fa-eye${visiblePassword ? '-slash' : ''}`}></i> {`${visiblePassword ? 'Ocultar ' : 'Mostrar '}`}Contraseña</button>
                  </div>
                  <small className="login__password__small">Tu contraseña debe tener almenos 1 mayúscula, 1 minúscula, 1 número y almenos 1 símbolo.</small>
                </div>
                <button className={`mt-3 login__btn`} type="submit">Registrate</button>
              </form>
            </div>
          </div>
          <div className="login-image d-none d-md-block">
            <div className="login-image__overlay d-flex justify-content-center align-items-center flex-column">
              <img src={SurveyJobLogo} alt="SurveyJobLogo" className="w-50" />
              <p className="text-light">¡Encuestas a un click!</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LoginScreen;
