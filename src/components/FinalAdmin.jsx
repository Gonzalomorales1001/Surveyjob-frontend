import React, { useEffect, useState } from "react";

//importar componente de tabla
// import FinalTableEncuestas from "../components/FinalTableEncuestas";
import { getEncuestas, getEncuestasById } from "../helpers/encuestas";
// import  {getEcuestas}  from "../helpers/encuestas"; //traer encuestas al padre
// import Paginacion from "./Paginacion";

const FinalAdmin = () => {
  //estado para guardar los encuestas
  const [encuestas, setEncuestas] = useState([]);
  const [totalEncuestas, setTotalEncuestas] = useState(0)

  // paginacion
  const limite = 6;
  const [pagina, setPagina] = useState(0);

  //cargar encuestas y actualizar
  useEffect(() => {
    traerEncuestas();
  }, [pagina]);

  const traerEncuestas = async () => {
    const { encuestas } = await getEncuestas (limite, pagina);
    setEncuestas(encuestas);
    setTotalEncuestas(total)
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
            {encuestas.length>0 ? (
            <> 
            {/* Componente de la tabla que carga los encuestas  */}
            <FinalTableEncuestas encuestas={encuestas} />
            <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            total={totalEncuestas}
            />
            </>) : (
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
