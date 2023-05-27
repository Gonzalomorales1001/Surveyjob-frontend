import React, { useContext, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { AnswerContext } from '../views/SurveyScreen'
import '../css/Question.css'

const Question = ({content,questionType,options,questionID,questionNumber,surveyCategory,dark}) => {
    const {answerArray,setAnswerArray} = useContext(AnswerContext);

    const [userAnswer, setUserAnswer] = useState({
        question:content,
        questionID:questionID,
        answer:{}
    })

    const handleSubmit=(e)=>{
        const id=questionID
        e.preventDefault()
        setUserAnswer({
            ...userAnswer,
            answer:{
                [e.target.name]:e.target.value
            }
        })

        // if(id===userAnswer.questionID){
        //     const ansIndex=answerArray.findIndex((answer)=>answer.questionID===id)
        //     console.log(ansIndex)
        //     setAnswerArray(answerArray[ansIndex])
        // }else{
        //     setAnswerArray([...answerArray,userAnswer])
        // }
        
        setAnswerArray([...answerArray,userAnswer])
    }

    const questionTypeInfo=(type)=>{
        switch(type){
            case "TEXT":
                return 'Escribe tu respuesta (Máximo 250 caracteres)'
            break
            case "SELECT":
            case "RADIO":
                return 'Elige una opción'
            break
            case "CHECKBOX":
                return 'Selecciona una o más opciones'
            break
        }
    };

    const questionTypeRender=(type)=>{
        switch(type){
            case "TEXT":
                return (
                    <div className='col' key={questionID}>
                        <textarea 
                        name={`textarea-${questionID}`} 
                        id={`textarea-${questionID}`} 
                        maxLength={250} 
                        className={`form-control question__text ${dark&&'question__text--dark'}`}
                        onChange={handleSubmit}
                        >
                        </textarea>
                    </div>
                )
            break
            case "SELECT":
            case "RADIO":
                return options.map((option,index)=>{
                    return (
                            <div className="col-12 question__radio mb-2" key={questionID+index}>
                                <input 
                                type="radio" 
                                className="btn-check" 
                                id={`btn-check-outlined-${questionID}-radio-${index+1}`} 
                                name={`radio-${questionID}`} 
                                autoComplete="off"
                                onChange={handleSubmit}
                                value={option}
                                />
                                <label className={`btn ${dark?'btn-outline-light':'btn-outline-dark'} w-100 rounded-pill`} htmlFor={`btn-check-outlined-${questionID}-radio-${index+1}`}>{option}</label><br/>
                            </div>
                    )
                })
            break
            case "CHECKBOX":
                return options.map((option,index)=>{
                        return (
                            <div className="col-12 col-md-6 col-lg-4 question__check mb-2" key={questionID+index}>
                                <input 
                                type="checkbox" 
                                className="btn-check" 
                                id={`btn-check-outlined-${questionID}-check-${index+1}`} 
                                name={`check-${questionID}`}
                                autoComplete="off"
                                onChange={handleSubmit}
                                />
                                <label className={`btn ${dark?'btn-outline-light':'btn-outline-dark'} w-100 rounded-1 px-4 py-2 text-start`} htmlFor={`btn-check-outlined-${questionID}-check-${index+1}`}>{option}</label><br/>
                            </div>
                        )
                    })
            break
        }
    };

  return (
        <form className={`card card-margin w-100 ${dark&&'card--dark text-light'}`}>
            <div className="card-body pt-4">
                <div className="widget-49">
                    <div className={`widget-49-title-wrapper`}>
                        <div className={`flex-shrink-0 ${dark?'widget-49-date-light':'widget-49-date-dark'}`}>
                            <span className="widget-49-date-day fs-1">{questionNumber}</span>
                        </div>
                        <div className="widget-49-meeting-info">
                            <span className={`widget-49-pro-title fs-2 ${dark&&'text-light'}`}>{content}</span>
                            <span className="widget-49-meeting-time">{questionTypeInfo(questionType)}</span>
                        </div>
                    </div>
                    <br />
                    <div className="row justify-content-start">
                        {questionTypeRender(questionType)}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Question