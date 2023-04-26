import { url } from "./URL"

export const GetUserByID=async(userID)=>{
    const resp= await fetch(`${url}/api/users/${userID}`)

    const data= await resp.json()

    return data
}