import React from 'react'

const Question = ({content,options,questionType,questionID,index}) => {

    const questionTypeRender=(type)=>{
        switch(type){
            case "TEXT":
                return (
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Escribe tu respuesta</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                )
            break
            case "SELECT":
                return (
                    <>
                    <small>Elige una opcion</small>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        {options.map((option,index)=>{
                            return <option value={option} key={index+1}>{option}</option>
                        })}
                    </select>
                    </>
                )
            break
            case "CHECKBOX":
                return options.map((option,index)=>{
                        return (
                            <div className="form-check" key={index}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              {option}
                            </label>
                        </div>
                        )
                    })
            break
        }
    }

  return (
<div className="card text-bg-warning mb-3">
  <div className="card-header">Pregunta {index+1}</div>
  <div className="card-body">
    <h5 className="card-title">{content}</h5>
    {questionTypeRender(questionType)}
  </div>
</div>
  )
}

export default Question