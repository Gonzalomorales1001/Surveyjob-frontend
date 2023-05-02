import React from 'react'
import { useNavigate } from 'react-router'
import Job from '../assets/job.png'

const LoginScreen = () => {
    const navigate=useNavigate()

  return (
    <>
    <h1 className='fw-200'>Iniciar Sesión en Survey Job <img src={Job} width="35px" alt='Job letter'/></h1>
    {/* navigate('/login') */}
    </>
  )
}

export default LoginScreen