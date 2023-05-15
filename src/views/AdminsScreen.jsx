import React, { useEffect, useState } from "react";
import { getSurveys } from "../helpers/SurveyAPI";
import { getUsers } from "../helpers/UserAPI";
// import CardUser from "./CardUser";
import Job from "../assets/job.png";
import "../css/admin.css";

const AdminsScreen = ({ dark, usersx, company, survey }) => {
  //ver su estan bien importados
  //desestructurar datos de encuestas, empresas y usuarios
  // const {totalUser, emailUser, userID, statusUser}= usuario;
  // const {totalSurvey, SurveyID, statusSurvey}= encuestas;
  // const {totalCompany, emailCompany, CompanyID, statusCompany}= compañia;
  //desestructurar bien los datos para usar en section

  const [users, setUsers] = useState([]);
  const [totalusuarios, setTotalUsuarios] = useState(0);
  const limite = 3;
  const [pagina, setPagina] = useState(0);

  const traerUsuarios = async () => {
    const { Users } = await getUsers(limite, pagina);
    console.log(Users);
    setUsers(Users);
  };
  useEffect(() => {
    traerUsuarios();
  }, [pagina]);
  const traerEncuestas = async () => {
    const { Users } = await getSurveys(limite, pagina);
    console.log(Users);
    setUsers(Users);
  };
  useEffect(() => {
    traerUsuarios();
  }, [pagina]);

  () => setPagina((prevPagina) => prevPagina + 1);
  return (
    <div className={` ${dark ? "secAdmin-dark" : "secAdmin-light"}`}>
      <div className="container-fluid w-100">
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
        {/* hacer un ternario para que aparezca este mensaje o lo que pido encuestas ousers */}
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
                <div className="box d-flex rounded-2 align-items-center p-3 btn btn-get mb-2">
                  <i className="uil-file fs-2 text-center bg-danger rounded-circle"></i>
                  <div
                    className="ms-3"
                    type="button"
                    onClick={() => getSurveys}
                  >
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">34</h3>{" "}
                      <span className="d-block ms-2">Encuestas</span>
                    </div>
                    <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="box d-flex rounded-2 align-items-center p-3 btn btn-get mb-2">
                  <i className="uil-users-alt fs-2 text-center bg-success rounded-circle"></i>
                  <div className="ms-3" type="button" onClick={() => getUsers}>
                    <div className="d-flex align-items-center">
                      <h3 className="mb-0">5,245</h3>{" "}
                      <span className="d-block ms-2">Usuarios</span>
                    </div>
                    <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        {/* <div className="d-flex">
          <div id="sidebar-menu" className="menuAdmin row ">
            <button
              type="button"
              className="btn btn-get mb-2"
              onClick={() => getUsers}
            >
              Usuarios */}
        {/* ver onClick que no estan llamando a las funciones */}
        {/* </button>
            <button
              type="button"
              className="btn btn-get mb-2"
              onClick={() => getSurveys}
            >
              Encuestas
            </button>
          </div>
          <div className="row col-md-6">
            <div>
              {users.length > 0 ? (
                users.map((users) => <CardUser users={users} />)
              ) : (
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div> */}
        {/* usar para traerusers 
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 mb-5">
              {usuarios.length > 0 ? (
               users.map((usuario) => (
                  // <p>{usuario.username}</p>
                  <CardUser key={usuario.userID} usuario={usuario} />
                ))
              ) : (
                <div className="d-flex justify-content-center">
                  <div className="">
                    <span className="">Loading...</span>
                  </div>
                </div>
              )}
            </div>
            
          </div> */}
      </div>
    </div>
  );
};

export default AdminsScreen;
