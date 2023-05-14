import React, { useEffect, useState } from 'react';
import { getSurveyByID } from '../helpers/SurveyRoute';
import { getUserByID } from '../helpers/UserRoute';
import { useParams } from 'react-router';
import '../css/Question.css'
import Question from '../components/Question';
import SpeechBubble from '../components/SpeechBubble';

const SurveyScreen = ({dark}) => {

  const {surveyID}=useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [userData, setUserData] = useState(null)
  const [err, setErr] = useState(false)

  const getSurveyData=async()=>{
    await getSurveyByID(surveyID)
    .then(r=>setSurveyData(r?.surveyFoundByID))
    .catch(err=>setErr(true));
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
    <main className={`${dark?'surveyscreen-bg-dark text-light':'surveyscreen-bg-light'}`}>
      <div className="container">
        {userData?(
          <>
            <h3 className='text-center'>Encuesta de {userData?.username}</h3>
            {surveyData.questions.map((question,index)=><Question 
            content={question.content} 
            questionType={question.questionType}
            options={question.options} 
            questionID={question.questionID} 
            questionNumber={index+1}
            surveyCategory={surveyData.category}
            dark={dark}
            key={index}/>)}
            <hr />
            <div className="d-flex flex-column flex-lg-row">
              <button className={`${dark?'btn btn-light':'btn btn-dark'} rounded-pill my-3 flex-shrink-0`}>Enviar Respuestas</button>
              <SpeechBubble color={`${dark?'rgba(255,255,255,0.1)':'#00000080'}`} textLight={true} body={'Recuerda que una vez enviadas tus respuestas, ¡Ya no se podran volver a editar!'}/>
            </div>
          </>
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