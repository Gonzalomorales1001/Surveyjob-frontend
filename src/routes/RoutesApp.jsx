import React from 'react'
import { Router } from 'react-router'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import PageNotFoundScreen from '../views/PageNotFoundScreen'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminsScreen from '../views/AdminsScreen'
import UserScreen from '../views/UserScreen'
import SurveyScreen from '../views/SurveyScreen'
import ListasUsuarios from '../views/ListasUsuarios'
import ListaEncuestas from '../views/ListaEncuestas'
import AdminOnlyRoutes from './AdminOnlyRoutes'
import AdminRoutes from './AdminRoutes'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/admin/*' element={
        <AdminOnlyRoutes>
          <AdminRoutes/>
        </AdminOnlyRoutes>
      }/>
      <Route path='/user/:id' element={<UserScreen/>}/>
    </Routes>
  )
}

export default RoutesApp