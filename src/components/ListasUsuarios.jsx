import React, { useContext, useEffect, useState } from "react";
import "../css/Card.css";
import { DarkModeContext } from "../App";
import { getUsers, deleteUser } from "../helpers/UserAPI";
import "../css/admin.css";
import { InfiniteLoader } from "./InfiniteLoader";
import Card from '@mui/material/Card';
import { Avatar, Button, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";
import Pagination from "./Pagination";
import Swal from "sweetalert2";

const ListasUsuarios = () => {
  const { dark } = useContext(DarkModeContext);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [paginationEnabled, setPaginationEnabled] = useState(true);

  const limit = 6;

  const traerUsuarios = async () => {
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

  useEffect(() => {
    traerUsuarios();
  }, [page]);

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <h4>Administrar Usuarios</h4>
      {users ? (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100 justify-content-center">
            {users.map((user, index) => (
              <div className="col" key={'user-' + index}>
                <Card className='m-2'>
                  <CardHeader avatar={
                    <Avatar>
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  } title={user.username} subheader={user.email} />
                  <CardContent>
                    <button className={`btn ${dark ? 'btn-outline-danger' : 'btn-danger'} rounded-1 d-block w-100`} onClick={() => removeUser(user.userID)}>
                      <i className="fa fa-trash-o me-2"></i><span>Eliminar Usuario</span>
                    </button>
                  </CardContent>
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
