import React, { useContext, useEffect, useState } from "react";
import "../css/Card.css";
import { DarkModeContext } from "../App";
import { getUsers, deleteUser } from "../helpers/UserAPI";
import "../css/admin.css";
import { InfiniteLoader } from "./InfiniteLoader";
import Card from '@mui/material/Card';
import { Button, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";

const ListasUsuarios = () => {
  const { dark } = useContext(DarkModeContext);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [paginationEnabled, setPaginationEnabled] = useState(true);

  const limit = 5;

  const traerUsuarios = async () => {
    const { Users, total } = await getUsers(limit);
    setUsers(Users);
    setTotal(total);
  };
  useEffect(() => {
    traerUsuarios();
  }, [limit]);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      {users ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {users.map((user, index) => {
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader avatar={user.username.charAt(0)} title={user.username} subheader={user.email} />
              <CardContent>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="danger"><i className="fa fa-trash-o me-2"></i>Eliminar Usuario</Button>
              </CardActions>
            </Card>
          })}
        </div>
      ) : (
        <div className="spinner-border text-warning m-5" style={{ width: "10rem", height: "10rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default ListasUsuarios;
