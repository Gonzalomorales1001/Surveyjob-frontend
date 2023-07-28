import React, { useContext, useEffect, useState } from "react";
import { getSurveys } from "../helpers/SurveyAPI";
import { getUsers } from "../helpers/UserAPI";
import { getCategories } from "../helpers/CategoryAPI";
import "../css/admin.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { UserContext, DarkModeContext } from "../App";
import Pagination from "../components/Pagination";
import Card from '@mui/material/Card';
import { Avatar, CardActionArea, CardHeader, ThemeProvider, createTheme } from '@mui/material';
import Error500 from '../assets/Error500.svg';
import { InfiniteLoader } from "../components/InfiniteLoader";
import CategoryAdministrator from "../components/CategoryAdministrator";
import ListasEncuestas from "./ListaEncuestas";
import ListasUsuarios from "./ListasUsuarios";
// import Paginacion from "../../../../fanl rolling/Surveyjob-frontend/src/components/Paginacion";

const AdminsScreen = () => {
  const { dark } = useContext(DarkModeContext)
  const [users, setUsers] = useState();
  const [surveys, setSurveys] = useState();
  const [categories, setCategories] = useState();
  const [totalEncuestas, setTotalEncuestas] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [show, setShow] = useState({
    surveysAdministrator: false,
    usersAdministrator: false,
  })
  const [err, setErr] = useState(false);

  const traerCategorías = async () => {
    try {
      const resp = await getCategories(0, 0);
      setCategories(resp.Categories);
      setTotalCategorias(resp.total);
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  }

  const traerEncuestas = async () => {
    try {
      const { surveys, total } = await getSurveys(0, 5);
      setSurveys(surveys);
      setTotalEncuestas(total);
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  };

  const traerUsuarios = async () => {
    try {
      const { Users, total } = await getUsers(0, 5);
      setUsers(Users);
      setTotalUsuarios(total);
    } catch (error) {
      console.error(error);
      setErr(true);
    }
  };

  useEffect(() => {
    traerCategorías();
    traerEncuestas();
    traerUsuarios();
  }, []);

  return (
    <section className={`${dark ? 'texturized--dark text-light' : 'texturized--light'} pt-1 pb-3`}>
      {surveys && users && categories ? (
        <>
          <div className="black-overlay py-5">
            <div className="container">
              <h1>Panel de Administración</h1>
              <div className="row row-cols-1 row-cols-md-2 d-flex align-items-center justify-content-center my-3">
                {/* <div className="col-md-1 "></div> */}
                <div className="col">
                  <Card className='rounded-4 mb-2' onClick={() => setShow({ surveysAdministrator: true, usersAdministrator: false })}>
                    <CardActionArea>
                      <CardHeader title="Administrar Encuestas" subheader={`${totalEncuestas} Encuestas totales`} />
                    </CardActionArea>
                  </Card>
                </div>
                <div className="col">
                  <Card className='rounded-4 mb-2' onClick={() => setShow({ surveysAdministrator: false, usersAdministrator: true })}>
                    <CardActionArea>
                      <CardHeader title="Administrar Usuarios" subheader={`${totalUsuarios} Usuarios`} />
                    </CardActionArea>
                  </Card>
                </div>
              </div>
              {show.surveysAdministrator && (
                <ListasEncuestas />
              )}
              {show.usersAdministrator && (
                <ListasUsuarios />
              )}
            </div>
          </div>
          <article className="container">
            <div className={`card ${dark && 'card--dark'} p-3 m-lg-5 m-md-3`}>
              <CategoryAdministrator />
            </div>
          </article>
        </>
      ) : err ? (
        <div className="container">
          <div className='row align-items-center justify-content-center py-4 loading-screen'>
            <img src={Error500} alt="serverless" className='col-12 col-lg-6 w-50' />
            <div className='col-12 col-lg-6 d-flex justify-content-center align-items-center flex-column'>
              <h1 className='text-center text-secondary'>No ha sido posible cargar la información!</h1>
              <h3 className='text-center text-secondary'>Ha ocurrido un error!</h3>
              <p className='text-center text-secondary'>Error 500: Internal Server Error</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className='container d-flex justify-content-center align-items-start py-5 loading-screen'>
            <div>
              <h1 className='text-center'>Cargando...</h1>
              <p className='text-center mb-5'>Cargando herramientas de administración</p>
              <InfiniteLoader dark={dark} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminsScreen;
