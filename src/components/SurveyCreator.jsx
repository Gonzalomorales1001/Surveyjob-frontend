import React, { useContext, useEffect, useState } from 'react';
import { DarkModeContext, UserContext } from '../App';
import { getCategories } from '../helpers/CategoryAPI';
import { Modal, Button } from 'react-bootstrap';

const SurveyCreator = () => {
    //using Contexts
    const {dark}=useContext(DarkModeContext);
    const {userData} = useContext(UserContext);
    //useState
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newSurvey, setNewSurvey] = useState({
        title:'',
        questions:[],
        public: null,
        anonymous: true,
    })
    const [question, setQuestion] = useState([]);
    const [answerType, setAnswerType] = useState('TEXT');
    const [showAnswerOptions, setShowAnswerOptions] = useState(false);

    useEffect(() => {
        getCategories().then(r=>{
            const activeCategories=[];
            r.Categories.forEach(category=>{
                if(category.status){
                    const capitalizedCategory=category.category.charAt(0)+category.category.substring(1).toLowerCase();
                    activeCategories.push(capitalizedCategory);
                }
            })
            setCategories(activeCategories);
        }).catch(err=>{
            console.warn('Error al obtener las categorías');
            console.error(err)
        })
    }, []);

    useEffect(() => {
      if (answerType==='TEXT') {
        setShowAnswerOptions(false);
      } else {
        setShowAnswerOptions(true);
      }
    }, [answerType]);
    
    
  return (
    <section className='container py-2'>
        <div className="row row-cols-1 row-cols-md-2 pb-3">
            <div className="col">
                <label htmlFor="title" className="mb-2">Título de la encuesta</label>
                <input type="text" name='title' className={`form-control ${dark&&'question__text--dark'}`}/>
            </div>
            <div className="col">
                <label htmlFor="category" className="mb-2">Selecciona una categoría</label>
                <select aria-label="Default select example" name='category' className={`form-select ${dark&&'question__text--dark'}`}>
                    {categories.map((category,index)=>{
                        return (<option className='py-3' key={index}>{category}</option>)
                    })}
                </select>
            </div>
        </div>
        <h3>Preguntas</h3>
        <div>
            <div className={`card ${dark&&'card--dark'} new-survey--question my-5`}>
                <span className='my-4 fs-3'>Texto de la pregunta</span>
            </div>
            <button className={`btn rounded-3 w-100 ${dark?'btn-outline-warning':'btn-warning'}`} onClick={()=>setShowModal(true)}><i className="fa fa-plus me-3"></i>Añadir nueva pregunta</button>
        </div>
        <Modal show={showModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Agregar Pregunta
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row row-cols-1 pb-3">
                <div className="col">
                    <label htmlFor="question" className="my-2">Escribe tu pregunta</label>
                    <input type="text" name='question' className={`form-control ${dark&&'question__text--dark'}`}/>
                </div>
                <div className="col">
                    <label htmlFor="answer-type" className="my-2">Elige el tipo de respuesta <abbr title="La forma en la que el usuario responderá la pregunta"><i class="fa fa-question-circle" aria-hidden="true"></i></abbr></label>
                    <select aria-label="Default select example" onChange={(e)=>setAnswerType(e.target.value)} name='select-answer-type' className={`form-select ${dark&&'question__text--dark'}`}>
                        <option value="TEXT" className="py-3">Escribir respuesta</option>
                        <option value="RADIO" className="py-3">Elegir una opción</option>
                        <option value="CHECKBOX" className="py-3">Elegir una o más opciones</option>
                    </select>
                </div>
                {showAnswerOptions&&(
                    <>
                    <div className="col">
                        <label htmlFor="question" className="my-2">Agregar Opciones</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Escribe aquí y presiona enter" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-warning" type="button" id="button-addon2">Añadir</button>
                        </div>
                    </div>
                    <div className="col">

                    </div>
                    </>
                )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-warning rounded-3"><i className="fa fa-plus me-3"></i>Añadir nueva pregunta</button>
            <button className='btn btn-secondary rounded-3' onClick={()=>{setShowModal(false);setAnswerType('TEXT')}}>Cancelar</button>
          </Modal.Footer>
        </Modal>
    </section>
  )
}

export default SurveyCreator