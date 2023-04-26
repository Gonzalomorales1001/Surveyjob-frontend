import React, { useState, useEffect } from "react";
import {
  borrarUsuario,
  actualizarUsuario,
  getUsuarioById,
  getUsuarios,
} from "../helpers/usuarios";
import Swal from "sweetalert2";
import avatar from "../assets/avatar.png";
import "../components/CardUser.css";
// import ModalEdit from "./ModalEdit";

const TablaUser = ({ usuario }) => {
  const { username, email, userID, status } = usuario;

  //borrrar usuario
  const inactivarUsuario = async () => {
    Swal.fire({
      title: `Está seguro que quiere inactivar este usuario ${username}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        borrarUsuario(userID).then((resultado) => {
          Swal.fire("", `${resultado.msg}`, "success");
        });
      } else if (result.isDenied) {
        Swal.fire("El usuario no se inactivó", "", "info");
      }
    });
  };
  return (
    <>
      {/* <p>{username}</p> */}

      <div className="card col-12 my-2">
        <td>
          <div className="d-flex justify-content-end gap-3 me-2 mt-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => handleShow(userID)}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => inactivarUsuario(username, userID)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </td>
        <div className="row ">
          <div className="d-flex justify-content-center col-md-4 ">
            <img className="avatar" src={avatar} alt="avatar" />
          </div>
          <div className="col-md-8 ">
            <div className="card-body">
              <h5 className="card-title">{username}</h5>

              <p className="card-text">
                <small className="text-body-secondary">{email}</small>
              </p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablaUser;
