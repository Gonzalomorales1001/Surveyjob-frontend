import {URL} from '../helpers/URL';

export const getSurveyByID=async(surveyID)=>{
    const response=await fetch(`${URL}/surveys/${surveyID}`);
    const data=await response.json();
    return data;
}