import React, { useEffect, useState } from "react";
import "../css/Card.css";
import { getSurveys } from "../helpers/SurveyAPI";
import "../css/admin.css";
import CardSurvey from "../components/CardSurvey";

import { InfiniteLoader } from "../components/InfiniteLoader";

const ListasEncuestas = ({ dark }) => {
  const [surveys, setSurveys] = useState([]);
  const [totalEncuestas, setTotalEncuestas] = useState(0);
  // const limite = 5; //prueba con limite - este es el limite que funciona
  const [limit, setLimit] = useState(1);

  // const [pagina, setPagina] = useState(0);

  const traerEncuestas = async () => {
    const { surveys, total } = await getSurveys(limit);
    setSurveys(surveys);
    setTotalEncuestas(total);
  };
  useEffect(() => {
    traerEncuestas();
  }, [limit]);

  // () => setPagina((prevPagina) => prevPagina + 1);
  const { title, surveyID } = surveys; //datos a usar de los usuarios
  return (
    <>
      <div className={`${dark ? "texturized--dark" : "texturized--light"}`}>
        <div className="col-12 col-md-8 offset-md-2 p-2">
          {surveys.length > 0 ? (
            surveys.map((survey) => (
              <CardSurvey key={survey.surveyID} dark={dark} survey={survey} />
            ))
          ) : (
            <div className="d-flex justify-content-center">
              <div className="d-flex justify-content-center">
                <InfiniteLoader dark={dark} />
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center">
        <button
          className="btn btn-warning rounded-4 mx-2"
          onClick={() => setLimit(limit + 5)}
          >
          Ver Más
        </button>

        <button
          className="btn btn-warning rounded-4"
          onClick={() => setLimit(limit - 5)}
          >
          Ver Menos
        </button>
          </div>
      </div>
    </>
  );
};

export default ListasEncuestas;
