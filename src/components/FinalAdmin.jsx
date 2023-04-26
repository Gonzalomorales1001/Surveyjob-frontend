import React, { useEffect, useState } from "react";
import { crearEncuesta } from "../helpers/encuestas";
//importar componente de tabla
// import FinalTableEncuestas from "../components/FinalTableEncuestas";
import { getEncuestas, getEncuestasById } from "../helpers/encuestas"; //traer encuestas al padre
// import Paginacion from "./Paginacion";
import {getUsuarios} from "../helpers/usuarios";
// import TablaUser from "../components/TablaUser";
//Librería sweet alert
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import ModalCreate from "./ModalCreate";
import TablaUser from "./TablaUser";

const FinalAdmin = () => {
    // const MySwal = withReactContent(Swal);
  //Manejo del modal--------------------
  // const [show, setShow] = useState("");
  //manejar cierre de modal
  // const handleClose = () => {
  //   setShow(false);
  // };
  //Manejar apertura de modal
  // const createSurvey = async() => {
  //   // console.log("hola mundo")
  //   // await crearEncuesta();
  //   // Swal.fire("Encuesta creada correctamente", "","success")
  //   // handleClose();
  
  //   setShow(true);
    
  // };
  //crear encuesta------esto no servia acá
  // const createsurvey = async () => {
  //   MySwal.fire({
  //     title: `Está seguro que quiere crear la encuesta ${nombre}?`,
  //     showDenyButton: true,
  //     showCancelButton: false,
  //     confirmButtonText: "Si",
  //     denyButtonText: `No`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       crearEncuesta().then((resultado) => {
  //         MySwal.fire("", `${resultado.msg}`, "success");
  //       });
  //     } else if (result.isDenied) {
  //       MySwal.fire("El encuesta no fue creada", "", "info");
  //     }
  //   });
  // };
  

  //estado para guardar los encuestas
  // const [encuestas, setEncuestas] = useState([]);
  // const [totalEncuestas, setTotalEncuestas] = useState(0);
  const [usuarios, setUsuarios] = useState([])
  const [totalusuarios, setTotalUsuarios] = useState(0);
  // paginacion
  const limite = 4;
  const [pagina, setPagina] = useState(0);

  const traerUsuarios = async () => {
    const {Users} = await getUsuarios(limite, pagina);
    console.log(Users)
    setUsuarios(Users)
    // setUsuarios(total)
  };
  //cargar encuestas y actualizar
  useEffect(() => {
    // traerEncuestas();
    traerUsuarios()
  }, [pagina]);

  // const traerEncuestas = async () => {
  //   const { encuestas } = await getEncuestas(limite, pagina);
  //   setEncuestas(encuestas);
  //   setTotalEncuestas(total);
  // };

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
              usuarios.map((usuario)=>(
                // <p>{usuario.username}</p>
                <TablaUser key={usuario.userID} usuario={usuario}/>
                ))
      
            ) : (
              <div className="d-flex justify-content-center">
                <div className="">
                  <span className="">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalAdmin;
