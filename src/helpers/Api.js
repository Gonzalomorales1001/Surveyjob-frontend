import { url } from "./URL";



export const authLogin = async (datos)=>{

    try {
        const resp= await fetch(url,{
        method: "POST",
        body:datos,
        headers:{
            "Content-type":"applitacion/json; charset=UTF-8"
        },

        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error)
        return {msg: "No se pudo contectar con Backend"};
    }
}