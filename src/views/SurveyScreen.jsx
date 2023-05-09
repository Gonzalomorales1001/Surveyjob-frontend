import React, { useEffect, useState } from 'react';
import { getSurveyByID } from '../helpers/SurveyRoute';
import { getUserByID } from '../helpers/UserRoute';
import { useParams } from 'react-router';
import '../css/Survey.css'

const SurveyScreen = ({dark}) => {

  const {surveyID}=useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [userData, setUserData] = useState(null)
  const [err, setErr] = useState(false)

  const getSurveyData=async()=>{
    await getSurveyByID(surveyID)
    .then(r=>setSurveyData(r?.surveyFoundByID))
    .catch(err=>console.log(err));
  }

  useEffect(() => {
    getSurveyData();
  }, []);
  
  useEffect(() => {
    if(surveyData){
      const userID=surveyData.owner;
      getUserByID(userID)
      .then(r=>setUserData(r?.userFoundByID))
      .catch(err=>console.log(err));
    }else{
      console.log('Loading user data');
    }
  }, [surveyData]);
  

  return (
    <main className={`${dark?'surveyjob-bg-dark text-light':'surveyjob-bg-light'}`}>
      <div className="container">
        {userData?(
          <h3 className='text-center'>Encuesta de {userData?.username}</h3>
        ):err?(
          <h1>Hubo un error al cargar la información</h1>
        ):(
          <h1>Cargando...</h1>
        )}
      </div>
    </main>
  )
}

export default SurveyScreen