import React from 'react'
import React, { useEffect, useState } from "react";
import { getUsuariosById, actualizarUsuarios } from "../helpers/usuarios";

import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

const ModalUser = ({ show, handleClose, Uid }) => {
  const [usuario, setUsuario] = useState(null);
//   const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    traerDatosDeEncuesta();
    traerCategorias();
  }, []);

  const traerDatosDeEncuesta = async () => {
    //petición a la API de usuario por id
    const { usuario } = await getEncuestaById(cid);
    setUsuario(usuario);
  };

  const handleChange = (e) => {
    let valueCheck = false;
    if (e.target.name === "destacado") {
      if (e.target.checked) {
        valueCheck = true;
      } else {
        valueCheck = false;
      }
      setUsuario({
        ...usuario,
        [e.target.name]: valueCheck,
      });
    } else {
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Ejecutar funcion para actualizar el usuario con los datos del estado
    await actualizarEncuesta(cid, usuario);
    MySwal.fire("Encuesta actualizado", "", "success");
    //cerrar el modal luego de editar
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Encuesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuario ? (
            <form onSubmit={handleSubmit}>
              <label className="fw-bold">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={usuario.nombre}
                name="nombre"
                onChange={handleChange}
              />
              <label className="fw-bold">Preguntas</label>
              <input //no es editable la cantidad de preguntas
                type="number"
                className="form-control"
                value={usuario.preguntas}
                onChange={handleChange}
                name="preguntas"
              />
              <div className="my-2">
                <p>
                  <span className="fw-bold">Categoría actual:</span>{" "}
                  {usuario.categoria.nombre}
                </p>
                <label className="fw-bold">Cambiar categoría</label>
                <select
                  className="form-select"
                  name="categoria"
                  onChange={handleChange}
                >
                  <option value={usuario.categoria.nombre}>
                    Elije una categoría
                  </option>
                  {categorias &&
                    categorias.map((categoria) => (
                      <option key={categoria._id} value={categoria._id}>
                        {categoria.nombre}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={usuario.estado}
                  onChange={handleChange}
                  name="estado"
                />
                <label className="form-check-label fw-bold">Estado</label>
              </div>
              <div className="d-grid mt-2">
                <button className="btn btn-warning">Actualizar</button>
              </div>
            </form>
          ) : (
            <h3>Cargando...</h3>
          )}
        </Modal.Body>
      </Modal>
    
    </>
  )
}

export default ModalUser