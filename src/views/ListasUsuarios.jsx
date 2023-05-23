import React, { useEffect, useState } from "react";
import "../css/Card.css";
import { getUsers, deleteUser } from "../helpers/UserAPI";
import "../css/admin.css";
import Card from "../components/Card";

const ListasUsuarios = ({dark}) => {
  const [users, setUsers] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const limite = 3; //prueba con limite
  const [pagina, setPagina] = useState(0);

  const traerUsuarios = async () => {
    const { Users, total } = await getUsers(limite, pagina);
    setUsers(Users);
    setTotalUsuarios(total);
  };
  useEffect(() => {
    traerUsuarios();
  }, [pagina]);

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
            <div className="spinner-border text-warning  " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListasUsuarios;
