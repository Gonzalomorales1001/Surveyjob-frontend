import React, { useEffect, useState } from "react";

//importar componente de tabla
// import FinalTableEncuestas from "../components/FinalTableEncuestas";

//import {  } from "../helpers/"; traer encuestas al padre

const FinalAdmin = () => {
  //estado para guardar los encuestas
  const [encuestas, setEncuestas] = useState([]);

  //cargar encuestas cuando se monta y pendiente de actualización
  useEffect(() => {
    traerEncuestas();
  }, [encuestas]);

  const traerEncuestas = async () => {
    //Ejecutar petición a la API
    const { encuestas } = await getEcuestas();
    setEncuestas(encuestas);
  };

  return (
    <div className="bg-dark">
      <div className="container bg-light min-vh-100">
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
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            {/* Componente de la tabla que carga los encuestas  */}
            {/* <FinalTableEncuestas encuestas={encuestas} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalAdmin;
