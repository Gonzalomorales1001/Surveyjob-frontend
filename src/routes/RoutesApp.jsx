import React from 'react'
import { Router } from 'react-router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminsScreen from '../views/AdminsScreen'
import UserScreen from '../views/UserScreen'
import AdminOnlyRoutes from './AdminOnlyRoutes'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/admin/*' element={
        <AdminOnlyRoutes>
          <AdminsScreen />
        </AdminOnlyRoutes>
      } />
      <Route path='/user/:id' element={<UserScreen />} />
    </Routes>
  )
}

export default RoutesApp