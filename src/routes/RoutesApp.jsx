import React from 'react'
import { Router } from 'react-router'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import PageNotFoundScreen from '../views/PageNotFoundScreen'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminsScreen from '../views/AdminsScreen'
import UserScreen from '../views/UserScreen'
import SurveyScreen from '../views/SurveyScreen'

const RoutesApp = () => {
  return (
    <Routes>
        <Route path='/admin' element={<AdminsScreen/>}/>
        <Route path='/user' element={<UserScreen/>}/>
        <Route path='/survey' element={<SurveyScreen/>}/>
    </Routes>
  )
}

export default RoutesApp