import { URL } from "./URL";
const token = window.localStorage.getItem("") //importar / traer datos de token de local storage

export const getSurveyByID = async (surveyID) => {
const response = await fetch(`${URL}/surveys/${surveyID}`);
const data = await response.json();
return data;
};

//ver si es necesario usar /surveys/ todos los metodos
export const getSurveys = async (limite=1 , pagina = 0) => {
try {
    const resp = await fetch(URL + "/surveys?limit" + limite + "&since" + pagina);
    const data = await resp.json();
    return data;
} catch (error) {
    throw new Error("No se pudo obtener encuesta");
}
};

export const addSurvey = async (datos) => {
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
    return "No se pudo agregar su encuesta";
}
};

export const updateSurvey = async (id, datos) => {
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
    return "No se pudo actualizar encuesta";
}
};

export const addAnswer=async(surveyID,content)=>{
    try {
        const resp = await fetch(`${URL}/surveys/answer/${surveyID}`, {
        method: "PUT",
        body: JSON.stringify(content),
        headers: {
            "Content-type": "application/json; charter UTF-8",
        },
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
        return "No se conecto con el backend";
    }
}

export const deleteSurvey = async (id) => {
try {
    const resp = await fetch(URL + "/" + id, {
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
    return "No se pudo eliminar encuesta";
}
};
