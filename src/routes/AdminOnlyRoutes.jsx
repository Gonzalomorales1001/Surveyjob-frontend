import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../App'

const AdminOnlyRoutes = ({children}) => {
    const {userData}=useContext(UserContext)
    if (userData?.admin){
        return children
    }else{
        return <Navigate to='/'/>
    }
}

export default AdminOnlyRoutes