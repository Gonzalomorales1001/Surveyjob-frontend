import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children,userData}) => {
    if (userData){
        return children
    }else{
        return <Navigate to='/login'/>
    }
}

export default ProtectedRoutes