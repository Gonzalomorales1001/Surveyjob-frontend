import React, { useContext, useEffect, useState } from "react";
import "../css/Card.css";
import { DarkModeContext } from "../App";
import { getUsers, updateUser, deleteUser } from "../helpers/UserAPI";
import { InfiniteLoader } from "./InfiniteLoader";
import Card from '@mui/material/Card';
import { Avatar, Button, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import { SURVEYJOB_USERID } from "../App";
import { searchUser } from "../helpers/searchAPI";

const ListasUsuarios = () => {
  const { dark } = useContext(DarkModeContext);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [paginationEnabled, setPaginationEnabled] = useState(true);

  const limit = 6;

  const traerUsuarios = async () => {
    setPaginationEnabled(true);
    setUsers();
    const since = (page - 1) * limit;
    const { Users, total } = await getUsers(since, limit);
    setUsers(Users);
    setTotal(total);
  };

  const removeUser = async (id) => {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Estás seguro de que quieres eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#5c5c5c',
      confirmButtonText: '<i class="fa fa-trash-o"></i> Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await deleteUser(id);
        Swal.fire({
          title: resp.msg,
          icon: 'info'
        });
        traerUsuarios();
      }
    })
  }

  const toggleAdmin = async (id, content) => {
    Swal.fire({
      title: 'Cambiar permisos',
      text: '¿Estás seguro de que quieres cambiar permisos de administrador del usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f0a500',
      cancelButtonColor: '#5c5c5c',
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await updateUser(id, content);
        Swal.fire({
          title: resp.msg,
          icon: 'info'
        });
        traerUsuarios();
      }
    })
  }

  const filterUsers = async (term) => {
    if (term.length == 0) {
      setPaginationEnabled(true);
      setPage(1);
      return traerUsuarios();
    }
    const usersResult = await searchUser(term);
    setUsers(usersResult?.results);
    setTotal(usersResult?.total);
    setPaginationEnabled(false);
  }

  useEffect(() => {
    traerUsuarios();
  }, [page]);

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <h4>Administrar Usuarios</h4>
      {users ? (
        <>
          <div className="container">
            <div className={`form-floating mb-3 ${!dark && 'text-light'}`}>
              <input type="text" className={`form-control question__text--dark`} onChange={(e) => filterUsers(e.target.value)} name="search-user" id="search-user" placeholder="Buscar Usuario" />
              <label htmlFor="search-user">Buscar Usuario</label>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100 justify-content-center">
            {users.map((user, index) => (
              <div className="col" key={'user-' + index}>
                <Card className='m-2'>
                  <CardHeader avatar={
                    <Avatar>
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  } title={
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{user.username}</span>
                      {user.userID === SURVEYJOB_USERID && (<span className="badge text-bg-warning">SurveyJob Admin</span>)}
                    </div>
                  } subheader={user.email} />
                  <CardContent>
                    {user.userID != SURVEYJOB_USERID ? (
                      <div className="form-check form-switch">
                        <input className="form-check-input form-check-input-warning" onClick={() => toggleAdmin(user.userID, { ...user, admin: !user.admin })} checked={user.admin} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Permisos de Administrador</label>
                      </div>
                    ) : (
                      <div className="form-check form-switch">
                        <input className="form-check-input form-check-input-warning disabled" disabled checked type="checkbox" role="switch" id="SurveyJobAdminCheckbox" />
                        <label className="form-check-label" htmlFor="SurveyJobAdminCheckbox">Permisos de Administrador</label>
                      </div>
                    )}
                  </CardContent>
                  <CardActions>
                    {user.userID != SURVEYJOB_USERID ? (
                      <button className={`btn ${dark ? 'btn-outline-danger' : 'btn-danger'} rounded-1 d-block w-100`} onClick={() => removeUser(user.userID)}>
                        <i className="fa fa-trash-o me-2"></i><span>Eliminar Usuario</span>
                      </button>
                    ) : (
                      <button className="btn btn-outline-secondary disabled rounded-1 d-block w-100" disabled>
                        <i className="fa fa-trash-o me-2"></i><span>Eliminar Usuario</span>
                      </button>
                    )}
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
          {paginationEnabled && (
            <Pagination total={total} elementsPerPage={limit} page={page} setPage={setPage} />
          )}
        </>
      ) : (
        <div className="spinner-border text-warning m-5" style={{ width: "10rem", height: "10rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default ListasUsuarios;
