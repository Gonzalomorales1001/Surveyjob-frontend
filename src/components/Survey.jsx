import React from 'react'
import { Link } from 'react-router-dom'

const Survey = ({category,title,surveyID}) => {
  return (
    <div className='m-2'>
        <div className="card">
            <div className="card-header">
              {category}
            </div>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              {/* <p className="card-text">id:{surveyID}</p> */}
              <Link to={`/survey/${surveyID}`}>
              <button href="#" className="btn btn-warning">Responde esta encuesta</button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Survey