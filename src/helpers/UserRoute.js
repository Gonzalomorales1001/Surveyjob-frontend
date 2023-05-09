import { URL } from "./URL";

export const getUserByID=async(userID)=>{
    const response=await fetch(`${URL}/users/${userID}`);
    const data=await response.json();
    return data;
}