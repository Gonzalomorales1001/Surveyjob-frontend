import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { GetSurveyByID } from '../helpers/Surveys'

const SurveyScreen = () => {

    const [survey, setSurvey] = useState([])    

    const {surveyID}= useParams()

    const getSurveyData=()=>{
        GetSurveyByID(surveyID).then(r=>setSurvey(r.surveyFoundByID))
    }

    useEffect(() => {
      getSurveyData()
    }, [])
    

  return (
    <div>SurveyScreen
        id: {surveyID}
    </div>
  )
}

export default SurveyScreen