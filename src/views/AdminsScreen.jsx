import React, { useContext, useEffect, useState } from "react";
import { getSurveys } from "../helpers/SurveyAPI";
import { getUsers } from "../helpers/UserAPI";
import Job from "../assets/job.png";
import "../css/admin.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { UserContext, DarkModeContext } from "../App";
// import Pagination from "../components/Pagination";
// import Paginacion from "../../../../fanl rolling/Surveyjob-frontend/src/components/Paginacion";

const AdminsScreen = () => {
  const {dark}=useContext(DarkModeContext)
  const [users, setUsers] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [totalEncuestas, setTotalEncuestas] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const limite =0; //prueba con limite
  const [pagina, setPagina] = useState(0);

  const traerUsuarios = async () => {
    const { Users, total } = await getUsers(limite, pagina);
    setUsers(Users);
    setTotalUsuarios(total);
  };
  useEffect(() => {
    traerUsuarios();
  }, [pagina]);

  const traerEncuestas = async () => {
    const { surveys, total } = await getSurveys(limite, pagina);
    setSurveys(surveys);
    setTotalEncuestas(total);
  };
  useEffect(() => {
    traerEncuestas();
  }, [pagina]);

  () => setPagina((prevPagina) => prevPagina + 1);
  return (
    <>
      <div className={` ${dark ? "secAdmin-dark" : "secAdmin-light"}`}>
        <div className=" container-fluid w-100">
          <div className="row  py-5">
            <div className="col text-center ">
              <h1>
                <span>
                  <i className="fa fa-cogs" aria-hidden="true"></i>{" "}
                </span>
                Bienvenido al tablero administrador
              </h1>
            </div>
          </div>
          {/* hacer un ternario para que aparezca este mensaje o lo que pido encuestas ousuario */}
          <div className="mb-5 d-flex justify-content-center">
            {" "}
            <h1 className="fw-200">
              Survey Job <img src={Job} width="35px" alt="Job letter" /> La
              gestión en tus manos
            </h1>
          </div>
          <section className="statistics mt-4 mb-4 mx-4">
            <div className="row d-flex align-items-center justify-content-center">
              {/* <div className="col-md-1 "></div> */}
              <div className="col-lg-4">
                <Link to="/admin/surveylist">
                  <div
                    type="button"
                    className="box d-flex rounded-2 align-items-center p-3 btn-get mb-2"
                  >
                    <i className="uil-file fs-2 text-center bg-danger rounded-circle"></i>
                    <div className="ms-3">
                      <div className="d-flex align-items-center">
                        <h3 className="mb-0">{}</h3>{" "}
                        <span className=" d-block ms-2">
                          {totalEncuestas} Encuestas activas
                        </span>
                      </div>
                      </div>
                  </div>
                </Link>
              </div>
                <div className="col-lg-4">
              <Link to="/admin/userslist">
                  <div
                    type="button"
                    className="box d-flex rounded-2 align-items-center p-3  btn-get mb-2"
                  >
                    <i className="uil-users-alt fs-2 text-center bg-success rounded-circle"></i>
                    <div className="ms-3">
                      <div className="d-flex align-items-center">
                        <h3 className="mb-0">{}</h3>{" "}
                        <span className="d-block ms-2">
                          {totalUsuarios} Usuarios activos
                        </span>
                      </div>
                      </div>
                  </div>
              </Link>
                </div>
            </div>
          </section>
          <Outlet />
        </div>
        {/* <Paginacion/> */}
        {/* <Pagination 
        // totalEncuestas={totalEncuestas}
        // totalUsuarios={totalUsuarios}
         /> */}
      </div>
    </>
  );
};

export default AdminsScreen;
