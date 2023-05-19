import { URL } from "./URL";

export const getUserByID = async (userID) => {
const response = await fetch(`${URL}/users/${userID}`);
const data = await response.json();
return data;
};

export const getUsers = async (limite = 4, pagina = 0) => {
try {
    const resp = await fetch(URL + "/users?limit=" + limite + "&since=" + pagina
    );
    const data = await resp.json();
    return data;
} catch (error) {
    throw new Error("No se pudo obtener Informacion");
}
};

export const addUser = async (datos) => {
try {
    const resp = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
        "Content-type": "application/json; charter UTF-8",
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
//ver si hace falta usar /users para actualizar datos y borrar
export const updateUser = async (id, datos) => {
try {
    const resp = await fetch(URL + "/" + id, {
    method: "PUT",
    body: JSON.stringify(datos),
    headers: {
        "Content-type": "application/json; charter UTF-8",
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
    const resp = await fetch(URL + "/:" + id, {
    method: "DELET",
    headers: {
        "Content-type": "application/json; charter UTF-8",
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
