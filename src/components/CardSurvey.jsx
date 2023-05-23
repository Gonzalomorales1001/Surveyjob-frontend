import React from "react";
import survey2 from "../assets/survey.png";
import "../css/Card.css";
// import deleteUser from "../helpers/UserAPI/deleteUser"; // importar funciones de borrar y editar usuarios
import Swal from "sweetalert2"; // este es el modal de sweeralert

const CardSurvey = ({survey, dark }) => {
  const { title, category, surveyID, status } = survey;
  const inactivarUsuario = async () => {
    Swal.fire({
      // este es el modal de sweeralert
      title: `Está seguro que quiere inactivar este usuario ${title}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(surveyID).then((resultado) => {
          // agregar funciones
          Swal.fire("El usuario fue borrado", `${resultado.msg}`, "success"); //ver respuesta
        });
      } else if (result.isDenied) {
        Swal.fire("El usuario no se inactivó", "", "info");
      }
    });
  };
  return (
    <>
       <div className="row justify-content-center">
        <div className="card col-sm-8 my-2">
          <div className="d-flex me-2 mt-2 ">
            <div className="row ">
            <div className="d-flex mx-2 col-md-4 ">
                <img className="avatar" src={survey2} alt="avatar" />
                <div className="card-body">
                  <h5 className="card-title"> {title}</h5>
                  <p className="card-text">
                    <small>{category}</small>
                    </p>
                    <p><small>{surveyID}</small></p>
                  <button //se anula el boton para que solo se pueda eliminar
                    className="btn btn-warning btn-sm justify-content-end"
                    onClick={() => handleShow(surveyID)} // agregar funciones
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2 mx-3 justify-content-end"
                    onClick={() => inactivarUsuario(title, surveyID)} // agregar funciones
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card  col-sm-6 col-md-4 mx-5 my-2">
          <div className="d-flex  gap-3 me-2 mt-2">
            <div className="row ">
              <div className="d-flex mx-2 col-md-4 ">
                <img className="avatar" src={avatar} alt="avatar" />
                <div className="card-body">
                  <h5 className="card-title">Nombre {username}</h5> 
                  <p className="card-text">
                    <small>Email/Empresa{email}</small>
                  </p>
                </div>
              </div>
            </div>
            {/* <button //se anula el boton para que solo se pueda eliminar
              className="btn btn-warning btn-sm "
              onClick={() => handleShow(userID)} // agregar funciones
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button> 
            <button
              className="btn btn-danger btn-sm "
              onClick={() => inactivarUsuario(username, userID)} // agregar funciones
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div> */}

      </div>
    </>
);
};

export default CardSurvey;
