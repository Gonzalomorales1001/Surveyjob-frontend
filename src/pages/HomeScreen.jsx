import React from 'react'
import Survey from '../components/Survey'

import {GetAllSurveys} from '../helpers/Surveys'
import { useState } from 'react'
import { useEffect } from 'react'

const HomeScreen = () => {

    const [allSurveys, setAllSurveys] = useState([])

    const getSurveys=()=>{
        GetAllSurveys().then(r=>setAllSurveys(r.surveys))
        GetAllSurveys().then(r=>console.log(r.surveys))
    }

    useEffect(() => {
      getSurveys()
    }, [])
    
  return (
    <>
    <h1 className='text-center vw-100'>Lista de encuestas</h1>
    <hr />
    <div>  
        {allSurveys.map((survey,index)=>{
            return (
                <Survey category={survey.category} title={survey.title} surveyID={survey.surveyID} key={index}/>
            )
        })}
    </div>
    </>
  )
}

export default HomeScreen