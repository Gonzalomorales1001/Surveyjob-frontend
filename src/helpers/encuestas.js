import { useState } from "react";
import { url } from "./URL";

const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")) : ""


const limite = 5;
//ver los elementos del metodo GET
export const getEncuestas = async (pagina=0)=>{
    try {
        const resp = await fetch (url+"?limite"+limite+"&desde"+pagina)
        const data= await resp.json();
        return data;
    } catch (error)  {
        throw new Error ("No se pudo obtener Info")
        
    }
};
//para crear la pagina de la encuesta sola
export const getEncuestasById = async (id)=>{
    try {
        const resp = await fetch(url+"/"+id)
        const data = await resp.json();
return data
    } catch (error) {
        throw new Error ("No se pudo obtener Informacion")
        
    }
}
//ver los elementos que solicita la opcion POST
export const crearEncuesta = async (datos)=>{
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
}
//ver los elementos que solicita la opcion PUT
export const actualizarEncuesta= async (id, datos)=>{
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
}

///ver peticiones del metodo DELETE
export const borrarEncuesta = async (id)=>{
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
}