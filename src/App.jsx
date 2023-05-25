import { createContext, useState } from 'react'
import './App.css'
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

export const UserContext=createContext(null)

function App() {
  const [login, setLogin] = useState(true)
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
          <Navbar dark={dark} ToggleDarkMode={ToggleDarkMode} userData={userData}/>
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoutes userData={userData}>
                  <RoutesApp />
                </ProtectedRoutes>
              }
              />
            <Route
              path="/"
              element={<HomeScreen dark={dark} ToggleDarkMode={ToggleDarkMode} />}
              />
            <Route
              path="/login"
              element={
                <LoginScreen dark={dark} ToggleDarkMode={ToggleDarkMode} />
              }
              />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/admin" element={<AdminsScreen dark={dark} />}>
            <Route index element={<ListasUsuarios dark={dark}/>} />
              {" "}
              <Route path="/admin/userslist" element={<ListasUsuarios dark={dark}/>} />
              <Route path="/admin/surveylist" element={<ListasEncuestas dark={dark} />} />
            </Route>
            <Route path='/*' element={<PageNotFoundScreen/>}/>
          {/* sacar esto de admin */}

            <Route
              path="/survey/:surveyID"
              element={
                <SurveyScreen dark={dark} ToggleDarkMode={ToggleDarkMode} />
              }
              />
          </Routes>
          <Footer dark={dark} />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
