import { url } from "./URL";


export const authLogin = async (datos)=>{
    
    try {
        const resp= await fetch(`${url}/api/auten/login`
        ,{
        method: "POST",
        body: JSON.stringify(datos),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        },
        });
        const data = await resp.json();
            return data
        
    } catch (e) {
        console.log(e);
        return {msg: "No se pudo contectar con Backend"};
    }
}