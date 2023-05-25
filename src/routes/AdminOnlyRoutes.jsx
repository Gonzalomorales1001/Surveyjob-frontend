import React from 'react'

const AdminOnlyRoutes = ({children,userData}) => {
    if (userData.admin){
        return children
    }else{
        return <Navigate to='/'/>
    }
}

export default AdminOnlyRoutes