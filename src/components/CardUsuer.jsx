import React from "react";
import avatar from "../assets/avatar.png";
import "../css/Card.css";
// importar funciones de borrar y editar usuarios
import Swal from "sweetalert2"; // este es el modal de sweeralert

const CardUsuer = ({ usuario }) => {
  //traigo los datos desde admin
  const usuario = 1; //evitar error
  const { username, email, userID, status } = usuario; //datos a usar de los usuarios

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
        borrarUsuario(userID).then((resultado) => {
          // agregar funciones
          Swal.fire("", `${resultado.msg}`, "success");
        });
      } else if (result.isDenied) {
        Swal.fire("El usuario no se inactivó", "", "info");
      }
    });
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="card  col-sm-6 col-md-4 mx-5 my-2">
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
            <button
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
        </div>

        <div className="card  col-sm-6 offset-sm-3 col-md-4 mx-5 my-2">
          <div className="d-flex  gap-3 me-2 mt-2">
            <div className="row ">
              <div className="d-flex mx-2 col-md-4 ">
                <img className="avatar" src={avatar} alt="avatar" />
                <div className="card-body">
                  <h5 className="card-title">Nombre {username}</h5>
                  <p className="card-text">
                    <small>Email/Empresa{email}</small>
                  </p>
                  <button
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

    // const { username, email, userID, status } = usuario; //datos a usar de los usuarios

    // const inactivarUsuario = async () => {
    //     Swal.fire({
    //       // este es el modal de sweeralert
    //     title: `Está seguro que quiere inactivar este usuario ${username}?`,
    //     showDenyButton: true,
    //     showCancelButton: false,
    //     confirmButtonText: "Si",
    //     denyButtonText: `No`,
    //     }).then((result) => {
    //     if (result.isConfirmed) {
    //         borrarUsuario(userID).then((resultado) => {// agregar funciones
    //         Swal.fire("", `${resultado.msg}`, "success");
    //         });
    //     } else if (result.isDenied) {
    //         Swal.fire("El usuario no se inactivó", "", "info");
    //     }
    //     });
    // };
    // return (
    //     <>
    //     <div className="card col-12 my-2">
    //         <td>
    //         <div className="d-flex justify-content-end gap-3 me-2 mt-2">
    //             <button
    //             className="btn btn-warning btn-sm"
    //               onClick={() => handleShow(userID)} // agregar funciones
    //             >
    //             <i className="fa fa-pencil" aria-hidden="true"></i>
    //             </button>
    //             <button
    //             className="btn btn-danger btn-sm"
    //               onClick={() => inactivarUsuario(username, userID)} // agregar funciones
    //             >
    //             <i className="fa fa-trash" aria-hidden="true"></i>
    //             </button>
    //         </div>
    //         </td>
    //         <div className="row ">
    //         <div className="d-flex justify-content-center col-md-4 ">
    //             <img className="avatar" src={avatar} alt="avatar" />
    //         </div>
    //         <div className="col-md-8 ">
    //             <div className="card-body">
    //             <h5 className="card-title">{username}</h5>

    //             <p className="card-text">
    //                 <small className="text-body-secondary">{email}</small>
    //             </p>
    //             </div>
    //         </div>
    //         </div>
    //     </div>
    //     </>
  );
};

export default CardUsuer;
