import React, { createContext, useEffect, useState } from 'react';
import Question from '../components/Question';
import SpeechBubble from '../components/SpeechBubble';
import { addAnswer, getSurveyByID } from '../helpers/SurveyAPI';
import { getUserByID } from '../helpers/UserAPI';
import { useParams } from 'react-router';
import { InfiniteLoader } from '../components/InfiniteLoader';
import Serverless from '../assets/serverless.svg'
import '../css/Question.css'

const AnswerContext=createContext(null)

const SurveyScreen = ({dark}) => {
  const {surveyID}=useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [userData, setUserData] = useState(null)
  const [err, setErr] = useState(false)

  const [answerArray, setAnswerArray] = useState([])

  const getSurveyData=async()=>{
    await getSurveyByID(surveyID)
    .then(r=>setSurveyData(r?.surveyFoundByID))
    .catch(err=>{
      setErr(true)
      console.log('Error al obtener informacion de la encuesta')
      return console.log(`detail: ${err}`)
    });
  }

  useEffect(() => {
    getSurveyData();
  }, []);
  
  useEffect(() => {
    if(surveyData){
      const userID=surveyData.owner;
      getUserByID(userID)
      .then(r=>setUserData(r?.userFoundByID))
      .catch(err=>{
        setErr(true)
        console.log('Error al obtener informacion del usuario')
        return console.log(`detail: ${err}`)
      });
    }else{
      console.log('Loading user data');
    }
  }, [surveyData]);
  

  return (
    <main className={`${dark?'surveyscreen-bg-dark text-light':'surveyscreen-bg-light'}`}>
      <div className="container">
        {userData?(
          <AnswerContext.Provider value={{answerArray,setAnswerArray}}>
            <h3>Encuesta de {userData?.username}</h3>
            <h1 className='text-center my-3'>{surveyData.title}</h1>
              {surveyData.questions.map((question,index)=>
              <form action="">
                <Question 
                content={question.content} 
                questionType={question.questionType}
                options={question.options} 
                questionID={question._id} 
                questionNumber={index+1}
                surveyCategory={surveyData.category}
                dark={dark}
                key={index}/>
              </form>)}
            <hr />
            <div className="d-flex flex-column flex-lg-row">
              <button className={`${dark?'btn btn-light':'btn btn-dark'} rounded-pill my-3 flex-shrink-0`} onClick={()=>console.log('respuestas')}>Enviar Respuestas</button>
              <SpeechBubble color={`${dark?'rgba(255,255,255,0.1)':'#00000080'}`} textLight={true} body={'Recuerda que una vez enviadas tus respuestas, ¡Ya no se podran volver a editar!'}/>
            </div>
          </AnswerContext.Provider>
        ):err?(
          <div className='row align-items-center justify-content-center py-4 loading-screen'>
            <img src={Serverless} alt="serverless" className='col-12 col-lg-6 w-50' />
            <div className='col-12 col-lg-6 d-flex justify-content-center align-items-center flex-column'>
              <h1 className='text-center text-secondary'>No ha sido posible cargar la información!</h1>
              <h3 className='text-center text-secondary'>Error 500: Internal Server Error</h3>
              <p className='text-center text-secondary'>Por favor, ponte en contacto con algún administrador</p>
            </div>
          </div>
        ):(
          <div className='container d-flex justify-content-center align-items-start pt-5 loading-screen'>
            <div>
              <h1 className='text-center'>Cargando...</h1>
              <p className='text-center mb-5'>Cargando información de la encuesta. Por favor, espere unos instantes</p>
              <InfiniteLoader dark={dark}/>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default SurveyScreen