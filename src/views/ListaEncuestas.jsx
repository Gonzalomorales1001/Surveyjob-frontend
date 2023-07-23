import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext, UserContext } from '../App';
import "../css/Card.css";
import { getSurveys } from "../helpers/SurveyAPI";
import "../css/admin.css";
import CardSurvey from "../components/CardSurvey";
import { InfiniteLoader } from "../components/InfiniteLoader";

const ListasEncuestas = () => {
  const {dark}=useContext(DarkModeContext);
  const [surveys, setSurveys] = useState([]);
  const [totalEncuestas, setTotalEncuestas] = useState(0);
  // const limite = 5; //prueba con limite - este es el limite que funciona
  const [limit, setLimit] = useState(5)
  // const [pagina, setPagina] = useState(0);

  const traerEncuestas = async () => {
    const { surveys, total } = await getSurveys(limit);
    setSurveys(surveys);
    setTotalEncuestas(total);
  };
  useEffect(() => {
    traerEncuestas();
  }, [limit]);

  () => setPagina((prevPagina) => prevPagina + 1);
  const { title, surveyID } = surveys; //datos a usar de los usuarios
  return (
    <>
      {surveys.length > 0 ? (
      <div className={`container d-flex justify-content-center align-items-center`}>
        <section className={`card ${dark&&'card--dark'} p-4`}>
          <h3 className="text-center">Administrador de Encuestas</h3>
          <table class={`table text-center ${dark&&'text-light'}`}>
            <thead>
              <tr>
                <th scope="col" className="d-none d-md-table-cell">#</th>
                <th scope="col">Título</th>
                <th scope="col" className="d-none d-md-table-cell">Categoría</th>
                <th scope="col" className="d-none d-lg-table-cell">Descripción</th>
                <th scope="col">Cambiar</th>
                <th scope="col">Detalles</th>
              </tr>
            </thead>
            <tbody>
                {surveys.map((survey,index) => (
                  <tr key={'survey-'+index} className={`${!survey.status&&'text-muted'} border-none`}>
                    <th scope="row" className={`d-none d-md-table-cell ${!survey.status&&'text-warning'}`}>{index+1}</th>
                    <td className={`${!survey.status&&'text-warning'}`}>{survey.title}</td>
                    <td className="d-none d-md-table-cell">{survey.category}</td>
                    <td className="d-none d-lg-table-cell survey-table-desc">{survey.description}</td>
                    <td>
                      <div className="form-check form-switch w-100 h-100 d-flex justify-content-center align-items-center">
                        <input className="form-check-input form-check-input-warning" defaultChecked={survey.status} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                      </div>
                    </td>
                    <td><button className="btn btn-warning"><i className="fa fa-eye"></i></button></td>
                  </tr>
                  // <CardSurvey key={survey.surveyID} dark={dark} survey={survey} />
                ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className={`page-link ${dark&&'page-link--dark'}`}>&laquo;</a>
              </li>
              <li className="page-item"><a className={`page-link ${dark&&'page-link--dark'}`} href="#">1</a></li>
              <li className="page-item active"><a className={`page-link ${dark&&'page-link--dark'}`} href="#">2</a></li>
              <li className="page-item"><a className={`page-link ${dark&&'page-link--dark'}`} href="#">3</a></li>
              <li className="page-item">
                <a className={`page-link ${dark&&'page-link--dark'}`} href="#">&raquo;</a>
              </li>
            </ul>
          </nav>
        </section>
      </div>
      ) : (
          <>
            <InfiniteLoader dark={dark}/>
              <span className="visually-hidden">Cargando Encuestas...</span>
          </>
      )}
    </>
  );
};

export default ListasEncuestas;
