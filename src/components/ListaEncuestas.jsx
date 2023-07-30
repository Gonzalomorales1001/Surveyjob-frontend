import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext, UserContext } from '../App';
import "../css/Card.css";
import { getSurveys, deleteSurvey } from "../helpers/SurveyAPI";
import "../css/admin.css";
import CardSurvey from "./CardSurvey";
import { InfiniteLoader } from "./InfiniteLoader";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import { capitalize } from "../App";
import { searchSurvey } from "../helpers/searchAPI";
import { Button } from "@mui/material";


const ListasEncuestas = () => {
  const { dark } = useContext(DarkModeContext);
  const [surveys, setSurveys] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [paginationEnabled, setPaginationEnabled] = useState(true);

  const limit = 5;

  const traerEncuestas = async () => {
    setPaginationEnabled(true);
    setSurveys();
    const since = (page - 1) * limit;
    const { surveys, total } = await getSurveys(since, limit);
    setSurveys(surveys);
    setTotal(total);
  };

  const toggleSurveyStatus = async (id) => {
    Swal.fire({
      title: 'Eliminar encuesta',
      text: "¿Estás seguro que quieres eliminar esta encuesta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#666',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i> Eliminar encuesta',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await deleteSurvey(id);
        Swal.fire({
          icon: 'info',
          title: resp?.msg
        });
        traerEncuestas();
      }
    });
  }

  const filterSurveys = async (term) => {
    if (term.length == 0) {
      setPaginationEnabled(true);
      setPage(1);
      return traerEncuestas();
    }
    const surveysResult = await searchSurvey(term);
    setSurveys(surveysResult?.results);
    setTotal(surveysResult?.total);
    setPaginationEnabled(false);
  }

  useEffect(() => {
    traerEncuestas();
  }, [page]);

  return (
    <>
      <div className={`container d-flex justify-content-center align-items-center`}>
        <section className={`card ${dark ? 'card--dark survey-card--dark' : 'survey-card--light'} p-4 d-flex justify-content-center align-items-center`}>
          <h3 className="text-center">Administrador de Encuestas</h3>
          {surveys ? (
            <>
              <div className="container">
                <div className={`form-floating mb-3 ${!dark && 'text-light'}`}>
                  <input type="text" className={`form-control question__text--dark`} onChange={(e) => filterSurveys(e.target.value)} name="search-survey" id="search-survey" placeholder="Buscar encuesta" />
                  <label htmlFor="search-survey">Buscar encuesta</label>
                </div>
              </div>
              <table className={`table text-center ${dark && 'text-light'} table-borderless`}>
                <thead>
                  <tr>
                    <th scope="col">Título</th>
                    <th scope="col" className="d-none d-md-table-cell">Creador</th>
                    <th scope="col" className="d-none d-md-table-cell">Categoría</th>
                    <th scope="col" className="d-none d-lg-table-cell">Descripción</th>
                    <th scope="col">Activa</th>
                    <th scope="col">Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey, index) => (
                    <tr key={'survey-' + index} className={`${!survey.status && 'text-muted'} border-none`}>
                      <td scope="row">{survey.title}</td>
                      <td className="d-none d-md-table-cell">{survey.owner?.username}</td>
                      <td className="d-none d-md-table-cell">{capitalize(survey.category)}</td>
                      <td className="d-none d-lg-table-cell survey-table-desc">{survey.description}</td>
                      <td>
                        <Button variant='outlined' color='error' className='fs-5' onClick={() => toggleSurveyStatus(survey.surveyID)}><i className="fa fa-trash"></i></Button>
                      </td>
                      <td><Link to={`/survey/${survey.surveyID}`} target='_blank'><Button variant='outlined' color='warning'><span className="text-nowrap">Ver Encuesta</span></Button></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {paginationEnabled && (
                <Pagination total={total} elementsPerPage={limit} page={page} setPage={setPage} />
              )}
            </>
          ) : (
            <div className="spinner-border text-warning m-5" style={{ width: "10rem", height: "10rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ListasEncuestas;
