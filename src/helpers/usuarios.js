import { url } from "./URL";


//traer usuarios
export const getUsuarios = async () => {
    try {
        const resp = await fetch (url+"?limite"+limite+"&desde"+pagina)
        const data= await resp.json();
        return data;
    } catch (error) {
        throw new Error ("No se pudo obtener Informacion")    
    }
};

//traer usuario por id
export const getUsuarioById = async (id) => {
    try {
        const resp = await fetch(url+"/"+id)
        const data = await resp.json();
return data
    } catch (error) {
        throw new Error ("No se pudo obtener Informacion")
        
    }
};

//crear un usuario (Registro)
export const crearUsuario = async (datos) => {
    try {
        const resp = await fetch(url, {
            method:"POST",
            body : JSON.stringify(datos),
            headers:{
                "Content-type":"application/json; charter UTF-8",
                "x-token":token
            }
            })
            const data=await resp.json();
    return data
    } catch (error) {
        console.log(error);
        return("No se conecto con el backend");
        
    }
};

export const actualizarUsuario = async (id, datos) => {
    try {
        const resp = await fetch(url+"/"+id, {
            method:"PUT",
            body : JSON.stringify(datos),
            headers:{
                "Content-type":"application/json; charter UTF-8",
                "x-token":token,
            }
            })
            const data=await resp.json();
    return data
    } catch (error) {
        console.log(error);
        return("No se conecto con el backend");
        
    }
};

export const borrarUsuario = async (id) => {
    try {
        const resp = await fetch(url+"/"+id, {
            method:"DELET",
            headers:{
                "Content-type":"application/json; charter UTF-8",
                "x-token":token
            }
            })
            const data=await resp.json();
    return data
    } catch (error) {
        console.log(error);
        return("No se conecto con el backend");
        
    }
};