import { URL } from "./URL";

export const getCategories=async()=>{
    const response=await fetch(`${URL}/categories`);
    const data=response.json();
    return data;
}