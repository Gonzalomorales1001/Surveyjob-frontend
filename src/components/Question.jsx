import React from 'react'
import '../css/Question.css'

const Question = ({content,questionType,options,questionID,questionNumber,surveyCategory,dark}) => {

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
}

    const questionTypeRender=(type)=>{
        switch(type){
            case "TEXT":
                return (
                    <div className='col'>
                        <textarea name={`textarea-${questionID}`} id={`textarea-${questionID}`} maxLength={250} className={`form-control question__text ${dark&&'question__text--dark'}`}></textarea>
                    </div>
                )
            break
            case "SELECT":
            case "RADIO":
                return options.map((option,index)=>{
                    return (
                            <div className="col-12 question__radio mb-2">
                                <input type="radio" className="btn-check" id={`btn-check-outlined-${questionID}-radio-${index+1}`} name="options-outlined" autoComplete="off"/>
                                <label className={`btn ${dark?'btn-outline-light':'btn-outline-dark'} w-100 rounded-pill`} htmlFor={`btn-check-outlined-${questionID}-radio-${index+1}`}>{option}</label><br/>
                            </div>
                    )
                })
            break
            case "CHECKBOX":
                return options.map((option,index)=>{
                        return (
                            <div className="col-12 col-md-6 question__check mb-2">
                                <input type="checkbox" className="btn-check" id={`btn-check-outlined-${questionID}-check-${index+1}`} autoComplete="off"/>
                                <label className={`btn ${dark?'btn-outline-light':'btn-outline-dark'} w-100 rounded-1 px-4 py-2 text-start`} htmlFor={`btn-check-outlined-${questionID}-check-${index+1}`}>{option}</label><br/>
                            </div>
                        )
                    })
            break
        }
    }

  return (
    <div className="container p-0 p-md-auto px-lg-5">
        <div className="row">
            <div className="col p-0 p-md-auto px-lg-5">
                <div className={`card card-margin w-100 ${dark&&'card--dark text-light'}`}>
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
                </div>
            </div>
        </div>
    </div>
    )
}

export default Question




                            {/* <ol className="widget-49-meeting-points">
                                <li className="widget-49-meeting-item"><span>Expand module is removed</span></li>
                                <li className="widget-49-meeting-item"><span>Data migration is in scope</span></li>
                                <li className="widget-49-meeting-item"><span>Session timeout increase to 30 minutes</span></li>
                            </ol> */}
                            {/* <div className="widget-49-meeting-action">
                                <a href="#" className="btn btn-sm btn-flash-border-primary">View All</a>
                            </div> */}