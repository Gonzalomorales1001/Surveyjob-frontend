import React, { useEffect, useState } from "react";
import { getEncuestaById, actualizarEncuesta } from "../helpers/encuestaApi";
import { getCategorias } from "../helpers/categoriaApi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Modal from "react-bootstrap/Modal";

const ModalEdit = ({ show, handleClose, cid }) => {
  const MySwal = withReactContent(Swal); //viene de sweetalert2

  const [encuesta, setEncuesta] = useState(null);
  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    traerDatosDeEncuesta();
    traerCategorias();
  }, []);

  const traerDatosDeEncuesta = async () => {
    //petición a la API de encuesta por id
    const { encuesta } = await getEncuestaById(cid);
    setEncuesta(encuesta);
  };

  const traerCategorias = async () => {
    //petición a la API de categorias
    const { categorias } = await getCategorias();
    setCategorias(categorias);
  };

  const handleChange = (e) => {
    let valueCheck = false;
    if (e.target.name === "destacado") {
      if (e.target.checked) {
        valueCheck = true;
      } else {
        valueCheck = false;
      }
      setEncuesta({
        ...encuesta,
        [e.target.name]: valueCheck,
      });
    } else {
      setEncuesta({
        ...encuesta,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Ejecutar funcion para actualizar el encuesta con los datos del estado
    await actualizarEncuesta(cid, encuesta);
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
          {encuesta ? (
            <form onSubmit={handleSubmit}>
              <label className="fw-bold">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={encuesta.nombre}
                name="nombre"
                onChange={handleChange}
              />
              <label className="fw-bold">Preguntas</label>
              <input //no es editable la cantidad de preguntas
                type="number"
                className="form-control"
                value={encuesta.preguntas}
                onChange={handleChange}
                name="preguntas"
              />
              <div className="my-2">
                <p>
                  <span className="fw-bold">Categoría actual:</span>{" "}
                  {encuesta.categoria.nombre}
                </p>
                <label className="fw-bold">Cambiar categoría</label>
                <select
                  className="form-select"
                  name="categoria"
                  onChange={handleChange}
                >
                  <option value={encuesta.categoria.nombre}>
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
                  checked={encuesta.estado}
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
  );
};

export default ModalEdit;
