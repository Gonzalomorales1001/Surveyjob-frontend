import React, { useEffect, useState } from "react";
import "../css/Card.css";
import { getUsers, deleteUser } from "../helpers/UserAPI";
import "../css/admin.css";
import Card from "../components/Card";
import { InfiniteLoader } from "../components/InfiniteLoader";

const ListasUsuarios = ({ dark }) => {
  const [users, setUsers] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  // const limite = 4; //prueba con limite - este es el limite que funciona
  const [limit, setLimit] = useState(5);
  // const [pagina, setPagina] = useState(0);

  const traerUsuarios = async () => {
    const { Users, total } = await getUsers(limit);
    setUsers(Users);
    setTotalUsuarios(total);
  };
  useEffect(() => {
    traerUsuarios();
  }, [limit]);

  () => setPagina((prevPagina) => prevPagina + 1);

  const { username, email, userID, status } = users; //datos a usar de los usuarios
  return (
    <>
      <div className="col-12 col-md-8 offset-md-2 p-2">
        {users.length > 0 ? (
          users.map((user) => (
            // <p>{users.username}</p>
            <Card key={user.userID} user={user} dark={dark} />
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <InfiniteLoader dark={dark} />
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <button onClick={() => setLimit(limit + 5)}>Ver Más</button>

      <button onClick={() => setLimit(limit - 5)}>Ver Menos</button>
    </>
  );
};

export default ListasUsuarios;
