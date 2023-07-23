import React, { createContext, useEffect, useState, useContext } from 'react';
import Question from '../components/Question';
import SpeechBubble from '../components/SpeechBubble';
import { addAnswer, getSurveyByID } from '../helpers/SurveyAPI';
import { Navigate, useParams, useNavigate } from 'react-router';
import { InfiniteLoader } from '../components/InfiniteLoader';
import Error500 from '../assets/Error500.svg'
import Job from '../assets/job.png'
import {DarkModeContext} from '../App'
import '../css/Question.css'
import Swal from 'sweetalert2';

export const AnswerContext=createContext(null)

const SurveyScreen = () => {
  const {dark}=useContext(DarkModeContext)
  const navigate=useNavigate()
  const {surveyID}=useParams();
  const [surveyData, setSurveyData] = useState(null);
  const [err, setErr] = useState(false)

  const [answerArray, setAnswerArray] = useState([]);
  const surveyElements={
    answerArray,
    setAnswerArray,
  }

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

  const sendAnswer=async(e)=>{
    e.preventDefault();
    //validate
    if(answerArray.length!=surveyData.questions.length){
      return Swal.fire({
        icon:'warning',
        title:'Una o mas preguntas están sin responder',
        text:'Revisa tus respuestas y vuelve a intentarlo.'
      })
    }
    //sort questions by ID
    const answerArraySort=answerArray.slice(0)
    answerArraySort.sort((element1,element2)=>{
      if(element1.questionID<element2.questionID){return -1}
      else if(element1.questionID>element2.questionID){return 1}
      else{return 0}
    })
    //send
    const content={
      answers:answerArraySort
    }
    try {
      const addAnswerResp=await addAnswer(surveyID,content)
      Swal.fire({
        icon:'success',
        title:'Tu respuesta se ha enviado correctamente'
      })
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (err) {
      Swal.fire({
        icon:'error',
        title:'Ha ocurrido un error al enviar la información'
      })
    }
  }
  

  return (
    <main className={`${dark?'texturized--dark text-light':'texturized--light'}`}>
      <div className="container pt-3">
        {surveyData?(
          <AnswerContext.Provider value={{surveyElements}}>
        <section className={`card card-margin w-100 ${dark&&'card--dark text-light'}`}>
          <div className="card-body pt-4">
              <div className="widget-49">
                <div className="widget-49-meeting-info">
                    <small className="text-muted mb-2">Encuesta de {surveyData.owner?.username}</small>
                    <h1 className={`widget-49-pro-title fw-light text-center ${dark&&'text-light'}`}>{surveyData.title}</h1>
                    <p className="my-2">{surveyData.description}</p>
                    <span className="widget-49-meeting-time text-muted">{surveyData.category.charAt(0).toUpperCase() + surveyData.category.slice(1).toLowerCase()}</span>
                </div>
              <br />
              </div>
          </div>
        </section>
            <form>
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
            </form>
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