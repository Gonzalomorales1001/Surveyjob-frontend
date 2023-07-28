import { URL } from "./URL";
const token = JSON.parse(localStorage.getItem('x-token'));

export const getCategories=async(since,limit)=>{
    const response=await fetch(`${URL}/categories?since=${since}&limit=${limit}`);
    const data=response.json();
    return data;
}

export const newCategory = async(content)=>{
    try {
        const response=await fetch(`${URL}/categories`,{
            method: 'POST',
            body: JSON.stringify({category:content}),
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-token": token,
          },
        });
        const data=response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const putCategory=async(id,content)=>{
    try {
        const response=await fetch(`${URL}/categories/${id}`,{
            method: 'PUT',
            body: JSON.stringify({category:content}),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-token": token
            }
        });
        const data = response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteCategory=async(id)=>{
    try {
        const response = await fetch(`${URL}/categories/${id}`,{
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-token": token
            }
        });
        const data = response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}