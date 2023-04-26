import React, { useEffect, useState } from "react";
import { crearEncuesta } from "../helpers/encuestas";
import { getUsuarios } from "../helpers/usuarios";
import ModalCreate from "./ModalCreate";
import CardUser from "./CardUser";

const FinalAdmin = () => {

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
              Panel administrador
            </h1>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-success  px-1 ms-5"
          onClick={() => createSurvey()}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
          Nueva encuesta
        </button>

        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
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
          <nav aria-label="...">
            <ul class="pagination d-flex justify-content-end">
              <li class="page-item disabled">
                <a class="page-link">Previous</a>
              </li>
              <li class="page-item" onClick={() => setPagina(0)}>
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li
                class="page-item"
                onClick={() => setPagina(2)}
                aria-current="page"
              >
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item" onClick={() => setPagina(4)}>
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li
                class={`page-item ${pagina === 2 ? "disable" : ""}`}
                onClick={() => setPagina((prevPagina) => prevPagina + 3)}
              >
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FinalAdmin;
