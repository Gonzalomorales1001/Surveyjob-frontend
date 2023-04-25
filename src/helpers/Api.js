const url = "";

export const authLogin = async (datos)=>{

    try {
        const resp= await fetch(url,{
        method: "POST",
        body:"",
        headers:{
            "Content-type":"applitacion/json; charset=UTF-8"
        },

        });
        const data = await resp.jeson();
        return data;
    } catch (error) {
        console.log(error)
        return {msg: "No se pudo contectar con Backend"};
    }
}