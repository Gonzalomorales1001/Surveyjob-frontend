import React, { useState, useEffect } from "react";
import {
  borrarUsuario,
  actualizarUsuario,
  getUsuarioById,
  getUsuarios
} from "../helpers/usuarios";
import Swal from "sweetalert2";
import ModalEdit from "./ModalEdit";

const TablaUser = ({ encuestas = [] }) => {
  //Manejo del modal--------------------
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState(null);

  //manejar cierre de modal
  const handleClose = () => {
    setUid(null);
    setShow(false);
  };

  //Manejar apertura de modal
  const handleShow = (id) => {
    setUid(id);
    setShow(true);
  };

  //borrrar usuario
  const inactivarUsuario = async (nombre, id) => {
    Swal.fire({
      title: `Está seguro que quiere inactivar este usuario ${nombre}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        borrarUsuario(id).then((resultado) => {
          Swal.fire("", `${resultado.msg}`, "success");
        });
      } else if (result.isDenied) {
        Swal.fire("El encuesta no se inactivó", "", "info");
      }
    });
  };
const [usuarios, setUsuarios] = useState([""])

useEffect(() => {
const users=getUsuarios();
setUsuarios(users);
},[])



  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Mail</th>
            <th scope="col">Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user._id}>
              <th>{user.nombre}</th>
              <td>{user.mail}</td>
              <td>
                {user.estado ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor check" //cambiar logo por personita
                    className="bi bi-file-earmark-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor check" //cambiar logo por personita
                    className="bi bi-file-earmark-excel-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z" />
                  </svg>
                )}
              </td>
              <td>
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleShow(user._id)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      inactivarUsuario(user.nombre, user._id)
                    }
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {show && <ModalEdit show={show} handleClose={handleClose} uid={uid} />}
    </>
  );
};

export default TablaUser;
