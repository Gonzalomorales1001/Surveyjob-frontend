import { createContext, useEffect, useState } from 'react'
import './App.css'
import '@sweetalert2/themes/bulma/bulma.css'
import Navbar from './components/Navbar'
import { Router, json } from 'react-router'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomeScreen from './views/HomeScreen'
import PageNotFoundScreen from './views/PageNotFoundScreen'
import Footer from './components/Footer'
import LoginScreen from './views/LoginScreen'
import AdminsScreen from './views/AdminsScreen'
import UserScreen from './views/UserScreen'
import SurveyScreen from './views/SurveyScreen'
import RoutesApp from './routes/RoutesApp'
import ProtectedRoutes from './routes/ProtectedRoutes'
import ContactScreen from './views/ContactScreen'
import ListasUsuarios from './views/ListasUsuarios'
import ListasEncuestas from './views/ListaEncuestas'
import AdminOnlyRoutes from './routes/AdminOnlyRoutes'
import AdminRoutes from './routes/AdminRoutes'
import ChangePasswordScreen from './views/ChangePasswordScreen'

export const UserContext=createContext(null)
export const DarkModeContext=createContext(null)

function App() {
  const [login, setLogin] = useState(false)
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem('DarkMode')))
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))

  const ToggleDarkMode=()=>{
    setDark(!dark)
    localStorage.setItem('DarkMode',JSON.stringify(!dark))
  }

  const saveUserData=(userData)=>{
    setUserData(userData)
    localStorage.setItem('userData',JSON.stringify(userData))
  }

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData, saveUserData}}>
          <DarkModeContext.Provider value={{dark}}>
            <Navbar ToggleDarkMode={ToggleDarkMode} userData={userData}/>
            <Routes>
            <Route path='*' element={<PageNotFoundScreen/>}/>
              <Route path="/*" element={
                  <ProtectedRoutes userData={userData}>
                    <RoutesApp />
                  </ProtectedRoutes>
                }/>
              <Route path="/" element={<HomeScreen ToggleDarkMode={ToggleDarkMode} />}/>
              <Route path="/login" element={<LoginScreen/>}/>
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/survey/:surveyID" element={<SurveyScreen/>}/>
              <Route path='/reset-password/:id' element={<ChangePasswordScreen/>}/>
            </Routes>
            <Footer dark={dark} />
          </DarkModeContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
