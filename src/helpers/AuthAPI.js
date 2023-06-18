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
        throw new Error('Error al conectar con el servidor')
    }
}

export const requestNewPassword=async(email)=>{
    try {
        const response=await fetch(`${URL}/auten/forgotten-password`,{
            method:'POST',
            body: JSON.stringify(email),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        const data=response.json()
        return data
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con el servidor')
    }
}

export const resetPassword=async(id,password)=>{
    try {
        const response=await fetch(`${URL}/auten/reset-password/${id}`,{
            method:'PUT',
            body: JSON.stringify(password),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        const data=response.json()
        return data
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con el servidor')
    }
}