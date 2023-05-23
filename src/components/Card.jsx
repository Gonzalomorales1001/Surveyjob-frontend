import React from "react";
import avatar from "../assets/avatar.png";
import "../css/Card.css";
// import deleteUser from "../helpers/UserAPI/deleteUser"; // importar funciones de borrar y editar usuarios
import Swal from "sweetalert2"; // este es el modal de sweeralert

const Card = ({ user }) => {
  const { username, email, userID, status } = user; //datos a usar de los usuarios
  const inactivarUsuario = async () => {
    Swal.fire({
      // este es el modal de sweeralert
      title: `Está seguro que quiere inactivar este usuario ${username}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userID).then((resultado) => {
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
                <img className="avatar" src={avatar} alt="avatar" />
                <div className="card-body">
                  <h5 className="card-title"> {username}</h5>
                  <p className="card-text">
                    <small>{email}</small>
                  </p>
                  {/* <button //se anula el boton para que solo se pueda eliminar
                    className="btn btn-warning btn-sm"
                    onClick={() => handleShow(userID)} // agregar funciones
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-3"
                    onClick={() => inactivarUsuario(username, userID)} // agregar funciones
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button> */}
                </div>
              </div>
            </div>
            <button //se anula el boton para que solo se pueda eliminar
              className="btn btn-warning btn-sm mt-3 justify-content-end"
              onClick={() => handleShow(userID)} // agregar funciones
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              className="btn btn-danger btn-sm ms-2 mt-3 justify-content-end"
              onClick={() => inactivarUsuario(username, userID)} // agregar funciones
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
