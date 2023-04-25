import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/footer/Footer";
import Error404 from "../components/Error404";
// import Home from "../pages/Home"; //importara cristian
import Login from "../pages/Login";
import FinalAdmin from "../components/FinalAdmin";
import HomeScreen from "../pages/HomeScreen";
import SurveyScreen from "../pages/SurveyScreen";

const RoutesApp = () => {
  // agregar estado si esta conectado  entre {}
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<FinalAdmin />} />
        <Route path="/survey/:surveyID" element={<SurveyScreen />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
};

export default RoutesApp;
