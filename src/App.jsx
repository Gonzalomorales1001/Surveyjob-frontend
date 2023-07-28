import { createContext, useEffect, useState } from 'react';
import './App.css';
import '@sweetalert2/themes/bulma/bulma.css';
import Navbar from './components/Navbar';
import { Router, json } from 'react-router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './views/HomeScreen';
import PageNotFoundScreen from './views/PageNotFoundScreen';
import Footer from './components/Footer';
import LoginScreen from './views/LoginScreen';
import SurveyScreen from './views/SurveyScreen';
import RoutesApp from './routes/RoutesApp';
import ProtectedRoutes from './routes/ProtectedRoutes';
import ContactScreen from './views/ContactScreen';
import ChangePasswordScreen from './views/ChangePasswordScreen';
import { ThemeProvider, createTheme } from '@mui/material';

export const UserContext = createContext(null);
export const DarkModeContext = createContext(null);

export const SURVEYJOB_USERID = "64468dc0a3dbeb94c1620475";

export const capitalize = (word) => {
  const capitalizedWord = word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  return capitalizedWord;
}

function App() {
  const [login, setLogin] = useState(false);
  const [dark, setDark] = useState(JSON.parse(localStorage.getItem('DarkMode')));
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));

  const ToggleDarkMode = () => {
    setDark(!dark);
    localStorage.setItem('DarkMode', JSON.stringify(!dark));
  }

  const saveUserData = (userData) => {
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Outfit',
        'Prompt',
        'sans-serif'
      ].join(',')
    }
  });

  const darkTheme = createTheme({
    ...theme,
    palette: {
      mode: 'dark'
    }
  });

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, saveUserData }}>
          <DarkModeContext.Provider value={{ dark }}>
            <ThemeProvider theme={dark ? darkTheme : theme}>
              <Navbar ToggleDarkMode={ToggleDarkMode} userData={userData} />
              <Routes>
                <Route path="/*" element={
                  <ProtectedRoutes userData={userData}>
                    <RoutesApp />
                  </ProtectedRoutes>
                } />
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/contact" element={<ContactScreen />} />
                <Route path="/survey/:surveyID" element={<SurveyScreen />} />
                <Route path='/reset-password/:id' element={<ChangePasswordScreen />} />
                <Route path='*' element={<PageNotFoundScreen />} />
              </Routes>
              <Footer dark={dark} ToggleDarkMode={ToggleDarkMode} />
            </ThemeProvider>
          </DarkModeContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
