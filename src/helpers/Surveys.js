import {url} from '../helpers/URL'

export const GetAllSurveys=async()=>{
    try {
        const resp= await fetch(`${url}/api/surveys`)

        const data= await resp.json()

        return data
        
    } catch (error) {
        console.log(error)
    }
}

export const GetSurveyByID=async(surveyID)=>{
    try {
        const resp= await fetch(`${url}/api/surveys/${surveyID}`)

        const data= await resp.json()

        return data
    } catch (error) {
        console.log(error)
    }
}
