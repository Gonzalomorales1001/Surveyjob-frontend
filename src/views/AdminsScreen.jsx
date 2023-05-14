import React, { useEffect, useState } from "react";
import { getSurveys } from "../helpers/SurveyRoute";
import { getUsers } from "../helpers/UserRoute";
// import CardUser from "./CardUser";
import Job from "../assets/job.png";
import "../css/admin.css";

const AdminsScreen = () => {
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
        {/* hacer un ternario para que aparezca este mensaje o lo que pido encuestas ousers */}

        <div className="mb-5 d-flex justify-content-center">
          {" "}
          <h1 className="fw-200">
            Survey Job <img src={Job} width="35px" alt="Job letter" /> La
            gestión en tus manos
          </h1>
          <div></div>
        </div>
        <div className="d-flex"> 
          <div id="sidebar-menu" className="menuAdmin row "> 
            <button type="button" className="btn btn-get mb-2" onClick={()=>getUsers}>
              Usuarios
              {/* ver onClick que no estan llamando a las funciones */}
            </button>
            <button type="button" className="btn btn-get mb-2" onClick={()=>getSurveys}>
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
        </div>
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
