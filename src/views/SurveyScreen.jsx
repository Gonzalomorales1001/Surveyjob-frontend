import React, { createContext, useEffect, useState, useContext } from 'react';
import Question from '../components/Question';
import SpeechBubble from '../components/SpeechBubble';
import { addAnswer, getSurveyByID } from '../helpers/SurveyAPI';
import { getUserByID } from '../helpers/UserAPI';
import { Navigate, useParams } from 'react-router';
import { InfiniteLoader } from '../components/InfiniteLoader';
import Error500 from '../assets/Error500.svg'
import {DarkModeContext} from '../App'
import '../css/Question.css'

export const AnswerContext=createContext(null)

const SurveyScreen = () => {
  const {dark}=useContext(DarkModeContext)
  const {surveyID}=useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [userData, setUserData] = useState(null)
  const [err, setErr] = useState(false)

  const [answerArray, setAnswerArray] = useState([]);

  const getSurveyData=async()=>{
    await getSurveyByID(surveyID)
    .then(r=>{
      if(r.errors){return setErr(true)}
      setSurveyData(r?.surveyFoundByID)
    })
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
        setErr(true);
        console.log('Error al obtener informacion del usuario');
        return console.log(`detail: ${err}`);
      });
    }else{
      console.log('Loading user data...');
    }
  }, [surveyData]);
  
  const sendAnswer=async(e)=>{
    e.preventDefault();
    console.log(answerArray)
  }

  return (
    <main className={`${dark?'surveyscreen-bg-dark text-light':'surveyscreen-bg-light'}`}>
      <div className="container">
        {userData?(
          <AnswerContext.Provider value={{answerArray,setAnswerArray}}>
            <h3>Encuesta de {userData?.username}</h3>
            <h1 className='text-center my-3'>{surveyData.title}</h1>
              {surveyData.questions.map((question,index)=>
              <div className='mx-lg-5 px-lg-5' key={index}>
                <Question 
                content={question.content} 
                questionType={question.questionType}
                options={question.options} 
                questionID={question._id} 
                questionNumber={index+1}
                surveyCategory={surveyData.category}
                dark={dark}/>
              </div>)}
            <hr />
            <div className="d-flex flex-column flex-lg-row">
              <button className={`${dark?'btn btn-light':'btn btn-dark'} rounded-pill my-3 flex-shrink-0`} onClick={sendAnswer}>Enviar Respuestas</button>
              <SpeechBubble color={`${dark?'rgba(255,255,255,0.1)':'#00000080'}`} textLight={true} body={'Recuerda que una vez enviadas tus respuestas, ¡Ya no se podran volver a editar!'}/>
            </div>
          </AnswerContext.Provider>
        ):err?(
          <div className='row align-items-center justify-content-center py-4 loading-screen'>
            <img src={Error500} alt="serverless" className='col-12 col-lg-6 w-50' />
            <div className='col-12 col-lg-6 d-flex justify-content-center align-items-center flex-column'>
              <h1 className='text-center text-secondary'>No ha sido posible cargar la información!</h1>
              <h3 className='text-center text-secondary'>La encuesta no existe, o no está disponible en estos momentos!</h3>
              <p className='text-center text-secondary'>Por favor, ponte en contacto con algún administrador</p>
            </div>
          </div>
        ):(
          <div className='container d-flex justify-content-center align-items-start py-5 loading-screen'>
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