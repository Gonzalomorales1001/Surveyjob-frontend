import React from 'react'
import imgerror from "../assets/error404.jpeg";
function Error404() {
  return (
    <>
    <div className='d-flex justify-content-center'>
    <img src={imgerror} alt="Error404"  />
    </div>
    </>
  )
}

export default Error404