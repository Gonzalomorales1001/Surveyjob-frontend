import { URL } from "./URL";
// const token = window.localStorage.getItem("x-token")
const token = JSON.parse(localStorage.getItem("x-token"));
export const getUserByID = async (userID) => {
  const response = await fetch(`${URL}/users/${userID}`);
  const data = await response.json();
  return data;
};

export const getUsers = async (pagina, limite) => {
  try {
    const resp = await fetch(
      URL + "/users?limit=" + limite + "&since=" + pagina
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    throw new Error("No se pudo obtener Informacion");
  }
};

export const register = async (datos) => {
  try {
    const resp = await fetch(`${URL}/users`, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return "No se conecto con el backend";
  }
};
//ver si hace falta usar /users para actualizar datos y borrar
export const updateUser = async (id, datos) => {
  try {
    const resp = await fetch(URL + "/" + id, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return "No se conecto con el backend";
  }
};

export const deleteUser = async (id) => {
  try {
    const resp = await fetch(URL + "/users/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return "No se conecto con el backend";
  }
};
