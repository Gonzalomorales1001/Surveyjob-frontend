import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext, UserContext } from '../App';
import "../css/Card.css";
import { getSurveys } from "../helpers/SurveyAPI";
import "../css/admin.css";
import CardSurvey from "../components/CardSurvey";
import { InfiniteLoader } from "../components/InfiniteLoader";
import Pagination from "../components/Pagination";

const ListasEncuestas = () => {
  const {dark}=useContext(DarkModeContext);
  const [surveys, setSurveys] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  
  const limit = 5;

  const traerEncuestas = async () => {
    const since = (page - 1) * 5;
    const { surveys, total } = await getSurveys(since,limit,true);
    setSurveys(surveys);
    setTotal(total);
  };

  useEffect(() => {
    traerEncuestas();
  }, [page]);

  return (
    <>
      {surveys.length > 0 ? (
      <div className={`container d-flex justify-content-center align-items-center`}>
        <section className={`card ${dark?'card--dark survey-card--dark':'survey-card--light'} p-4`}>
          <h3 className="text-center">Administrador de Encuestas</h3>
          <table className={`table text-center ${dark&&'text-light'}`}>
            <thead>
              <tr>
                <th scope="col" className="d-none d-md-table-cell">#</th>
                <th scope="col">Título</th>
                <th scope="col" className="d-none d-md-table-cell">Categoría</th>
                <th scope="col" className="d-none d-lg-table-cell">Descripción</th>
                <th scope="col">Activa</th>
                <th scope="col">Detalles</th>
              </tr>
            </thead>
            <tbody>
                {surveys.map((survey,index) => (
                  <tr key={'survey-'+index} className={`${!survey.status&&'text-muted'} border-none`}>
                    <th scope="row" className={`d-none d-md-table-cell ${!survey.status&&'text-danger'}`}>{index+1}</th>
                    <td>{survey.title}</td>
                    <td className="d-none d-md-table-cell">{survey.category}</td>
                    <td className="d-none d-lg-table-cell survey-table-desc">{survey.description}</td>
                    <td>
                      <div className="form-check form-switch w-100 h-100 d-flex justify-content-center align-items-center">
                        <input className="form-check-input form-check-input-warning" defaultChecked={survey.status} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                      </div>
                    </td>
                    <td><button className="btn btn-warning"><i className="fa fa-eye"></i></button></td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination total={total} elementsPerPage={limit} page={page} setPage={setPage}/>
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
