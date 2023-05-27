import {URL} from './URL'

export const login=async(loginData)=>{
    try {
        const response=await fetch(`${URL}/auten/login`,{
            method:'POST',
            body: JSON.stringify(loginData),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        const data=response.json()
        return data
    } catch (error) {
        throw new Error('No ha sido posible iniciar sesion')
    }
}