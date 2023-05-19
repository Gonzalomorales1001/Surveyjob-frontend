import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import "../css/Card.css";
// import deleteUser from "../helpers/UserAPI/deleteUser"; // importar funciones de borrar y editar usuarios
import Swal from "sweetalert2"; // este es el modal de sweeralert
import { getSurveys } from "../helpers/SurveyAPI";
// import { getUsers, deleteUser } from "../helpers/UserAPI";
import "../css/admin.css";
import Card from "../components/Card";
import CardSurvey from "../components/CardSurvey";

const ListasEncuestas = () => {
  const [surveys, setSurveys] = useState([]);
  const [totalEncuestas, setTotalEncuestas] = useState(0);
  const limite = 3; //prueba con limite
  const [pagina, setPagina] = useState(0);

  const traerEncuestas = async () => {
    const { surveys, total } = await getSurveys(limite, pagina);
    setSurveys(surveys);
    setTotalEncuestas(total);
  };
  useEffect(() => {
    traerEncuestas();
  }, [pagina]);

  () => setPagina((prevPagina) => prevPagina + 1);
  //traigo los datos desde admin
  // const usuario = 1; //evitar error
  const { title, surveyID } = surveys; //datos a usar de los usuarios

  //   const inactivarEncuestas = async () => {
  //     Swal.fire({
  //       // este es el modal de sweeralert
  //       title: `Está seguro que quiere inactivar este usuario ${category}?`,
  //       showDenyButton: true,
  //       showCancelButton: false,
  //       confirmButtonText: "Si",
  //       denyButtonText: `No`,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         deleteSurvey(owner).then((resultado) => {
  //           // agregar funciones
  //           Swal.fire("El usuario fue borrado", `${resultado.msg}`, "success"); //ver respuesta
  //         });
  //       } else if (result.isDenied) {
  //         Swal.fire("El usuario no se inactivó", "", "info");
  //       }
  //     });
  //   };
  return (
    <>
      <div className="col-12 col-md-8 offset-md-2 mb-5">
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <CardSurvey key={survey.surveyID} survey={survey} />
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-warning  " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListasEncuestas;
