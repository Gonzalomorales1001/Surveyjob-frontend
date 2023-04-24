import React from "react";
import { Routes, Route } from "react-router-dom";
// import NavBar from "../components/NavBar";
// import Footer from "../components/Footer/Footer";
import Error404 from "../components/Error404";
// import Home from "../pages/Home"; //importara cristian
import Login from "../components/login";
import FinalAdmin from "../components/FinalAdmin";

const RoutesApp = () => { // agregar estado si esta conectado  entre {}
  return (
    <> 
      {/* <NavBar  />  */}
      <Routes>
      <Route path="/" element={<FinalAdmin/>} />
        {/* <Route path="/" element={<Home/>} /> */}

       <Route path="/*" element={<Error404/>} />
      </Routes>
      {/* <Footer/> */}
    </>
  );
};

export default RoutesApp;
