import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Router } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./views/HomeScreen";
import PageNotFoundScreen from "./views/PageNotFoundScreen";
import Footer from "./components/Footer";
import LoginScreen from "./views/LoginScreen";
import AdminsScreen from "./views/AdminsScreen";
import UserScreen from "./views/UserScreen";
import SurveyScreen from "./views/SurveyScreen";
import RoutesApp from "./routes/RoutesApp";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ContactScreen from "./views/ContactScreen";
import ListaEncuestas from "./views/ListaEncuestas";
import ListasUsuarios from "./views/ListasUsuarios";

function App() {
  const [login, setLogin] = useState(false);
  const [dark, setDark] = useState(false);

  const ToggleDarkMode = () => {
    setDark(!dark);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar dark={dark} ToggleDarkMode={ToggleDarkMode} login={login} />
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoutes login={login}>
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
            <Route path="/admin/surveylist" element={<ListaEncuestas dark={dark} />} />
          </Route>
          {/* sacar esto de admin */}

          <Route
            path="/survey/:surveyID"
            element={
              <SurveyScreen dark={dark} ToggleDarkMode={ToggleDarkMode} />
            }
          />
        </Routes>
        <Footer dark={dark} />
      </BrowserRouter>
    </>
  );
}

export default App;
