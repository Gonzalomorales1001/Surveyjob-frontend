import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { GetSurveyByID } from '../helpers/Surveys'
import { GetUserByID } from '../helpers/Users'
import Question from '../components/Question'

const SurveyScreen = () => {

    const [survey, setSurvey] = useState(null)    
    const [surveyOwner, setSurveyOwner] = useState([])  

    const {surveyID}= useParams()

    const getSurveyData=async()=>{
        await GetSurveyByID(surveyID).then(r=>setSurvey(r.surveyFoundByID))
      }
      useEffect(() => {
        getSurveyData()
    }, [])

    
    useEffect(() => {

      if(survey){
        GetUserByID(survey.owner).then(r=>{
          setSurveyOwner(r.userFoundByID.username)
        }).catch(err=>console.log(err))
      }else{
        console.log('Loading Data...')
      }
      
    }, [survey])
    
    

  return (
    <form className='container bg-survey'>
    <h1 className='text-center'>Encuesta de {surveyOwner}</h1>
    <hr />
    <h3>{survey?.title} - {survey?.category.charAt(0).toUpperCase()+survey?.category.substring(1).toLowerCase()}</h3>
    <div>
      {survey?.questions.map((question,index)=><Question content={question.content} questionType={question.questionType} options={question.options} questionID={question._id} index={index} key={index+1}/>)}
    <button className="btn btn-warning">Enviar mi respuesta</button>
    </div>
    </form>

  )
}

export default SurveyScreen