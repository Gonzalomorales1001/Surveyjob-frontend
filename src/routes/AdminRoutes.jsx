import React from 'react'
import { Route, Routes } from 'react-router'
import AdminsScreen from '../views/AdminsScreen'
import ListasUsuarios from '../views/ListasUsuarios'
import ListaEncuestas from '../views/ListaEncuestas'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<AdminsScreen/>}>
          <Route path='/userslist' element={<ListasUsuarios/>}/>
          <Route path='/surveylist' element={<ListaEncuestas/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoutes