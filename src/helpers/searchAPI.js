import { URL } from '../helpers/URL';

export const searchSurvey = async (term, isPublic, onlyCategory) => {
    try {
        const resp = await fetch(`${URL}/search/surveys/${term}${isPublic?'?public=true':''}`);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Hubo un error en la búsqueda');
    }
}

export const searchByCategory = async (term) => {
    try {
        const resp = await fetch(`${URL}/search/surveys/${term}?public=true&SearchByCategory=1`);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Hubo un error en la búsqueda');
    }
}

export const searchUser = async (term) => {
    try {
        const resp = await fetch(`${URL}/search/users/${term}`);
        const data = await resp.json();
        return data;
    } catch (error) {
        throw new Error('Hubo un error en la búsqueda');
    }
}