import React, { useEffect, useState } from "react";
import { crearEncuesta } from "../helpers/encuestas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; //intento 1
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

const ModalCreate = ({ show, handleClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearEncuesta();
    Swal.fire("Encuesta creada correctamente", "", "success");
    handleClose();
  };

  const [elementos, setElementos] = useState([""]);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(["", ""]);
  const addAnswer = () => {
    setAnswer([...answer, ""]);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formText">
              <Form.Control
                type="text"
                placeholder="Escribe tu pregunta aqui..."
              />
            </Form.Group>

            <Form.Group
              className="mb-3 "
              controlId="formBasicPassword"
              onInput={(e) => setQuestion(e.target.value)}
            >
              <Form.Label>Respuesta</Form.Label>
              {answer.map((respuesta) => {
                return (
                  <Form.Control
                    type="text"
                    defaultValue={respuesta}
                    className="mt-2"
                    placeholder="Respuesta"
                  />
                );
              })}
            </Form.Group>
            <div>
              {elementos.map((elemento, index) => {
                return <p>{elemento}</p>;
              })}
            </div>
            <Button variant="primary" onClick={addAnswer}>
              agregar respuesta
            </Button>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="{Mostrar ? : boleano , para el ternario}"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>

          {/* {encuesta ? ( // cuando conecte bd admitir este ternario */}
          {/* <form onSubmit={handleSubmit}>
            
                > */}
          {/* <option value={encuesta.categoria.nombre}>
                    Elije una categoría
                  </option> */}
          {/* {categorias &&
                    
                      </option> */}
          {/* ))} */}
          {/* </select>
            
            </form> */}
          {/* ) : ( // cuando conecte bd admitir este ternario */}
          <h3>Cargando...</h3>
          {/* )}  cuando conecte bd admitir este ternario */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreate;
