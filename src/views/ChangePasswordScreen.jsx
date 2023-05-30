import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { DarkModeContext } from '../App'
import Swal from 'sweetalert2'
import { resetPassword } from '../helpers/AuthAPI'
import { getUserByID } from '../helpers/UserAPI'
import { InfiniteLoader } from '../components/InfiniteLoader'
import Error500 from '../assets/Error500.svg'

const ChangePasswordScreen = () => {
    const {dark}=useContext(DarkModeContext)
    const {id}=useParams()
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null)
    const [err, setErr] = useState(false)

    const getUserData=async()=>{
      await getUserByID(id)
      .then(r=>{
        if(r?.userFoundByID){
          setUserData(r.userFoundByID)
        }else{
          setErr(true)
          console.log(r.errors[0].msg)
          Swal.fire({
            icon:'error',
            title:r.errors[0].msg
          })
        }
      })
      .catch(err=>{
        setErr(true)
        console.log('No se encontró el usuario especificado')
        console.error(`detail: ${err}`)
      })
    }

    useEffect(() => {
      getUserData()
    }, [])

    const [visiblePassword, setVisiblePassword] = useState(false)
    const viewPassword=(e)=>{
      e.preventDefault()
      setVisiblePassword(!visiblePassword)
    }

    const [formValues, setFormValues] = useState({
      newPassword:'',
      confirmPassword:'',
    })

    const handleInputs=(e)=>{
      setFormValues({
        ...formValues,
        [e.target.name]:e.target.value
      })
    }

    const submitNewPassword=async(e)=>{
      e.preventDefault()
      if(formValues.newPassword!=formValues.confirmPassword){
        return Swal.fire({
          icon:'warning',
          title:'Las contraseñas no coinciden'
        })
      }

      const createNewPasswordData={
        password:formValues.newPassword
      }

      const resetPasswordResponse=await resetPassword(id,createNewPasswordData)

      if(resetPasswordResponse.errors){
        Swal.fire({
          icon:'warning',
          title:resetPasswordResponse.errors[0].msg,
        })
      }else{
        Swal.fire({
          icon:'info',
          title:resetPasswordResponse.msg,
        })
        navigate('/login')
      }
    }
  return (
    <main className={`px-0 p-sm-5 p-md-5 d-flex align-items-center justify-content-center ${dark?'surveyscreen-bg-dark text-light':'surveyscreen-bg-light'}`}>
      {userData?(
          <form className={`w-100 card my-5 m-sm-3 m-md-5 p-4 p-md-5 w-lg-50 text-center ${dark&&'card--dark text-light'}`}>
          <h2 className='text-center'>Recuperar Contraseña de {userData.username}</h2>
            <div className="form-group my-3">
              <label className='mb-1' htmlFor="new-password">Nueva Contraseña</label>
              <input type={visiblePassword?'text':'password'} className={`form-control ${dark&&'question__text--dark'}`} name="newPassword" id="newPassword" value={formValues.newPassword} onChange={handleInputs} placeholder="@Pablillo1234"/>
            </div>
            <div className="form-group mb-3">
              <label className='mb-1' htmlFor="confirm-password">Confirmar Contraseña</label>
              <input type={visiblePassword?'text':'password'} className={`form-control ${dark&&'question__text--dark'}`} name="confirmPassword" id="confirmPassword" value={formValues.confirmPassword} onChange={handleInputs} placeholder="@Pablillo1234"/>
            </div>
            <div className='text-start'>
              <button onClick={viewPassword} className="btn btn-link text-decoration-none btn-sm"><i className={`fa fa-eye${visiblePassword?'-slash':''}`}></i> {`${visiblePassword?'Ocultar ':'Mostrar '}`}Contraseña</button>
            </div>
            <small className={`d-block text-start login__password__small ${dark&&'text-light'}`}>La contraseña debe tener almenos 8 caracteres, 1 mayúscula, 1 minúscula y almenos 1 símbolo.</small>
            <button className="btn btn-warning mt-2 rounded-3 btn-sm" onClick={submitNewPassword}>Cambiar Contraseña</button>
          </form>
        ):err?(
          <div className='row align-items-center justify-content-center py-4 loading-screen'>
            <img src={Error500} alt="serverless" className='col-12 col-lg-6 w-50' />
            <div className='col-12 col-lg-6 d-flex justify-content-center align-items-center flex-column'>
              <h1 className='text-center text-secondary'>No ha sido posible cargar la información!</h1>
              <h3 className='text-center text-secondary'>El usuario no existe, o no está disponible en estos momentos!</h3>
              <p className='text-center text-secondary'>Por favor, ponte en contacto con algún administrador</p>
            </div>
          </div>
        ):(
          <div className='container d-flex justify-content-center align-items-start py-5 loading-screen'>
            <div>
              <h1 className='text-center'>Cargando...</h1>
              <p className='text-center mb-5'>Cargando tu solicitud de reestablecimiento de contraseña. Por favor, espere unos instantes</p>
              <InfiniteLoader dark={dark}/>
            </div>
          </div>
        )}
    </main>
  )
}

export default ChangePasswordScreen