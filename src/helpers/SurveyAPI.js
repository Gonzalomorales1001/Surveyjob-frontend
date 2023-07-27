import { URL } from "./URL";
const token = JSON.parse(localStorage.getItem("x-token")); //importar / traer datos de token de local storage

export const getSurveyByID = async (surveyID) => {
  try {
    const response = await fetch(`${URL}/surveys/${surveyID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Hubo un error al hacer la petición');
  }
};

//ver si es necesario usar /surveys/ todos los metodos
export const getSurveys = async (since = 0, limit = 5, all) => {
  try {
    const resp = await fetch(`${URL}/surveys?since=${since}&limit=${limit}${all?'&all=true':''}`)
    const data = await resp.json();
    return data;
  } catch (error) {
    throw new Error("No se pudo obtener encuesta");
  }
};

export const addSurvey = async (survey, token) => {
  try {
    const resp = await fetch(`${URL}/surveys`, {
      method: "POST",
      body: JSON.stringify(survey),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": token,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return "No se pudo agregar su encuesta";
  }
};

export const updateSurvey = async (id, datos) => {
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
    return "No se pudo actualizar encuesta";
  }
};

export const addAnswer = async (surveyID, content) => {
  try {
    const resp = await fetch(`${URL}/surveys/answer/${surveyID}`, {
      method: "PUT",
      body: JSON.stringify(content),
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

export const deleteSurvey = async (surveyID) => {
  try {
    const token = JSON.parse(localStorage.getItem("x-token"));

    const resp = await fetch(`${URL}/surveys/${surveyID}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-token": `${token}`,
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return "No se pudo eliminar encuesta";
  }
};
