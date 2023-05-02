import React from 'react'
import '../css/SpeechBubble.css'


const SpeechBubble = ({position,direction,color,flip,body,textLight}) => {
  return (
    <div style={{"--bbColor":color}} className={`speech-bubble p${position} a${direction}  mx-auto`}>
        {/* <div className="title">{title}</div> */}
        <p className={`${textLight===true&&'text-light'} fw-100 speech-bubble__text`}>{body}</p>
    </div>
  )
}

//example usage import component
// <SpeechBubble color='rgba(0,0,0,0.2)' body='SurveyJob bubble example test' direction="left" position="bottom" textLight={true}/>


export default SpeechBubble