import React, { useContext } from 'react'
import SpeechBubble from '../components/SpeechBubble'
import { UserContext,DarkModeContext } from "../App";

const HomeScreen = () => {

  const {dark}=useContext(DarkModeContext)

  return (
    <section className={`${dark&&'bg-dark text-light'}`}>
      <h1>Bienvenido a SurveyJob</h1>
    </section>
  )
}

export default HomeScreen;