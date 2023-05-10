import React, { useEffect, useState } from "react";
// import { crearEncuesta } from "../helpers/encuestas";
// import { getUsuarios } from "../helpers/usuarios";
// import CardUser from "./CardUser";
import Job from "../assets/job.png";
import "../css/admin.css"

const AdminsScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [totalusuarios, setTotalUsuarios] = useState(0);
  const limite = 3;
  const [pagina, setPagina] = useState(0);

  const traerUsuarios = async () => {
    const { Users } = await getUsuarios(limite, pagina);
    console.log(Users);
    setUsuarios(Users);
  };
  useEffect(() => {
    traerUsuarios();
  }, [pagina]);

  () => setPagina((prevPagina) => prevPagina + 1);
  return (
    <div className="bg-dark ">
      <div className="container-fluid bg-light vw-100">
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
        {/* hacer un ternario para que aparezca este mensaje o lo que pido encuestas o usuarios */}
        <div className="mb-5 d-flex justify-content-center">
          {" "}
          <h1 classNameName="fw-200">
            Survey Job <img src={Job} width="35px" alt="Job letter" /> La
            gestión en tus manos
          </h1>
          <div></div>
        </div>
        <div>
          <div id="sidebar-menu" className="menuAdmin">
            <ul id="nav" class="panel panel-default nav">
              <li class="panel panel-group">
                <a
                  href="#panel-users"
                  data-toggle="collapse"
                  class="panel panel-heading"
                >
                  Usuarios
                  <span
                    class="pull-right glyphicon glyphicon-menu-down"
                    aria-hidden="true"
                  ></span>
                </a>
                <ul id="panel-users" class="panel-collapse collapse">
                  <li class="panel-body">
                    <a
                      href="#/dashboard-admin-users-accounts"
                      class="panel-body"
                    >
                      Todos los usuarios{" "}
                    </a>
                  </li>
                  <li class="panel-body">
                    <a
                      href="#/dashboard-admin-users-activities"
                      class="panel-body"
                    >
                      Usuarios Activos{" "}
                    </a>
                  </li>
                </ul>
              </li>

              <li class="panel panel-group">
                <a
                  href="#panel-apps"
                  data-toggle="collapse"
                  class="panel panel-heading"
                >
                  Encuestas
                  <span
                    class="pull-right glyphicon glyphicon-menu-down"
                    aria-hidden="true"
                  ></span>
                </a>
                <ul id="panel-apps" class="panel-collapse collapse">
                  <li class="panel-body">
                    <a href="#/dashboard-admin-apps-devapps" class="panel-body">
                      Todas las encuestas 
                    </a>
                  </li>
                  <li class="panel-body">
                    <a
                      href="#/dashboard-admin-apps-activities"
                      class="panel-body"
                    >
                      Encuestas Activas
                    </a>
                  </li>
                </ul>
              </li>
              </ul>
          </div>
        </div>
        {/* usar para traer usuarios 
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 mb-5">
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
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
