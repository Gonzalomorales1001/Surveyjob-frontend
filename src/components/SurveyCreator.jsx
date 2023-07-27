import React, { useContext, useEffect, useState } from 'react';
import { DarkModeContext, UserContext } from '../App';
import { getCategories } from '../helpers/CategoryAPI';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { addSurvey } from '../helpers/SurveyAPI';
import { Chip } from '@mui/material';

const SurveyCreator = ({toggleShowSurveyCreator,getSurveysByUserId}) => {
    const {dark}=useContext(DarkModeContext);
    const {userData} = useContext(UserContext);

    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newSurvey, setNewSurvey] = useState({
        title:'',
        category:'',
        description:'',
        questions:[],
        public: false,
    })
    const defaultQuestionConfig = {
        content:'',
        questionType:'TEXT',
        options:[],
    }
    const [newQuestion, setNewQuestion] = useState(defaultQuestionConfig);
    const [questionIndex, setQuestionIndex] = useState(null);
    const [option, setOption] = useState('');
    const [showAnswerOptions, setShowAnswerOptions] = useState(false);
    const [showEditQuestionButton, setShowEditQuestionButton] = useState(false);

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
      if (newQuestion.questionType==='TEXT') {
        setShowAnswerOptions(false);
      } else {
        setShowAnswerOptions(true);
      }
    }, [newQuestion.questionType]);

    const validateModalInputs=()=>{
        //[NOT p OR [(q OR r) AND s]]
        if (!(newQuestion?.content.length<5 || ( (newQuestion.questionType=='CHECKBOX'||newQuestion.questionType=='RADIO') && newQuestion.options.length<2 ))) {
            return true;
        } else {
            return false;
        }
    }

    const viewQuestion=(index)=>{
        setNewQuestion(newSurvey.questions[index]);
        setQuestionIndex(index);
        setShowEditQuestionButton(true);
        setShowModal(true);
    }
    
    const addOption=(e,buttonClick)=>{
        if (e.key==='Enter'||buttonClick) {
            if (option.length>0&&option!=newQuestion.options[newQuestion.options.length-1]) {
                const optionsArray=newQuestion.options.slice(0);
                optionsArray.push(option)
                setNewQuestion({...newQuestion,options:optionsArray});
                setOption('');
            } else {
                Swal.fire({
                    icon:'warning',
                    title:'No puedes enviar una opción vacía, ni tampoco puede ser idéntica a la anterior'
                });
            }
        }
    }

    const deleteOption=(index)=>{
        const optionsArray=newQuestion.options.slice(0);
        optionsArray.splice(index,1);
        setNewQuestion({...newQuestion,options:optionsArray});
    }

    const resetNewQuestion=()=>{
        setNewQuestion(defaultQuestionConfig);
        setOption('');
        setShowEditQuestionButton(false)
        setShowModal(false);
    }

    const addNewQuestion=()=>{
        const isValidQuestion=validateModalInputs();
        if(!isValidQuestion) {
            Swal.fire({
                icon:'error',
                title:'Uno o mas campos son incorrectos',
                text:'Porfavor, revisa los datos ingresados y vuelve a intentarlo'
            });
        } else {
            const questionsArray=newSurvey.questions.slice(0);
            questionsArray.push(newQuestion);
            setNewSurvey({...newSurvey,questions:questionsArray});
            resetNewQuestion();
        }
    }

    const editQuestion=(index)=>{
        const isValidQuestion=validateModalInputs();
        if(!isValidQuestion) {
            Swal.fire({
                icon:'error',
                title:'Uno o mas campos son incorrectos',
                text:'Porfavor, revisa los datos ingresados y vuelve a intentarlo'
            });
        } else {
            const questionsArray=newSurvey.questions.slice(0);
            questionsArray[index]=newQuestion;
            setNewSurvey({...newSurvey,questions:questionsArray});
            setShowEditQuestionButton(false)
            setShowModal(false);
            resetNewQuestion();
        }
    }

    const deleteQuestion=(index)=>{
        Swal.fire({
            title: '¿Eliminar esta pregunta?',
            text: "No podrás volver a restaurarla.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#f0a500',
            confirmButtonText: '<i class="fa fa-trash"></i> Eliminar encuesta',
            cancelButtonText:'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
                const questionsArray=newSurvey.questions.slice(0);
                questionsArray.splice(index,1);
                setNewSurvey({...newSurvey,questions:questionsArray});
                Swal.fire({
                    icon:'info',
                    title:'Pregunta eliminada',
                });
            }
          });
    }

    const sendNewSurvey=async(e)=>{
        e.preventDefault();
        //validations
        if (newSurvey.title.length<5) {
            return Swal.fire({
                icon:'error',
                title:'El título de la encuesta debe tener almenos 5 caracteres'
            });
        }

        if(newSurvey.description.length<10) {
            return Swal.fire({
                icon:'error',
                title:'La descripción de la encuesta debe tener almenos 10 caracteres'
            })
        }

        if(newSurvey.category.length<1){
            return Swal.fire({
                icon:'warning',
                title:'No has seleccionado una categoría'
            });
        }

        if(newSurvey.questions.length<1){
            return Swal.fire({
                icon:'error',
                title:'No puedes crear una encuesta sin preguntas'
            });
        }

        const token=JSON.parse(localStorage.getItem('x-token'));

        const addSurveyResponse = await addSurvey(newSurvey,token)

        if(addSurveyResponse.newSurvey){
            Swal.fire({
                icon:'success',
                title:'Tu encuesta ha sido creada con éxito',
            })
            getSurveysByUserId()
            return toggleShowSurveyCreator();
        }else{
            console.log(addSurveyResponse);
            Swal.fire({
                icon:'error',
                title:'Error al crear encuesta',
                titleText:'Vuelve a iniciar sesión',
                text:'Si el problema persiste, por favor, ponte en contacto con el administrador.'
            });
        }
        
    }

  return (
    <form className='container py-2' onSubmit={(e)=>sendNewSurvey(e)}>
        <h2>Crear nueva encuesta</h2>
        <div className="row row-cols-1 row-cols-md-2 pb-3">
            <div className="col">
                <label htmlFor="title" className="mb-2">Título de la encuesta</label>
                <input type="text" name='title' onChange={(e)=>setNewSurvey({...newSurvey,title:e.target.value})} value={newSurvey.title} className={`form-control ${dark&&'question__text--dark'}`}/>
                <small className="text-muted">El título debe tener almenos 5 caracteres.</small>
            </div>
            <div className="col">
                <label htmlFor="category" className="mb-2">Selecciona una categoría</label>
                <select defaultValue='' aria-label="Default select example" name='category' onChange={(e)=>setNewSurvey({...newSurvey,category:e.target.value.toUpperCase()})} className={`form-select ${dark&&'question__text--dark'}`}>
                    <option value="" className="py-3">Elige una categoría</option>
                    {categories.map((category,index)=>{
                        return (<option className='py-3' key={'category-'+index}>{category}</option>)
                    })}
                </select>
            </div>
        </div>
        <div className='mt-2'>
            <label htmlFor="description" className='mb-2'>Descripción de la encuesta</label>
            <textarea name="description" id="description" cols="30" rows="10" className={`form-control question__text ${dark&&'question__text--dark'}`} onChange={(e)=>setNewSurvey({...newSurvey,description:e.target.value})}></textarea>
        </div>
        <div className="form-check form-switch my-3">
            <input className="form-check-input form-check-input-warning" onChange={()=>setNewSurvey({...newSurvey,public:!newSurvey.public})} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Quiero que mi encuesta aparezca en el inicio de la página. <abbr title="Elige si quieres que la encuesta aparezca en la página de inicio, o que solo se pueda acceder mediante un link"><i className="fa fa-question-circle" aria-hidden="true"></i></abbr></label>
        </div>
        <h3>Preguntas de la encuesta</h3>
        <section>
            {newSurvey.questions.length>0?(
            <table className={`table table-stripped ${dark&&'text-light'}`}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pregunta</th>
                    <th scope="col" className='d-none d-lg-table-cell'>Tipo de Pregunta</th>
                    <th scope="col">Editar</th>
                    <th scope='col'>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                    {newSurvey.questions.map((question,index)=>{
                        return (
                            <tr key={'question-'+(index+1)}>
                                <th scope="row">{index+1}</th>
                                <td className='text-ellipsis'>{question.content}</td>
                                <td className="d-none d-lg-table-cell">{question.questionType}</td>
                                <td><button type='button' className="btn btn-outline-warning" onClick={()=>viewQuestion(index)}><i className="fa fa-pencil"></i></button></td>
                                <td><button type='button' className="btn btn-outline-danger" onClick={()=>deleteQuestion(index)}><i className="fa fa-trash"></i></button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            ):(
                <div className={`card ${dark&&'card--dark'}`}>
                    <h4 className='my-3'>Esta encuesta aún no tiene preguntas</h4>
                </div>
            )}
            <button type='button' className={`mt-4 btn btn-sm rounded-4 ${dark?'btn-outline-warning':'btn-warning'}`} onClick={()=>setShowModal(true)}><i className="fa fa-plus me-2"></i>Añadir nueva pregunta</button>
        </section>
        <button type='submit' value='Crear nueva encuesta' className={`rounded-4 mt-3 btn-lg w-100 btn ${dark?'btn-outline-warning':'btn-warning'}`}><i className="fa fa-user-plus me-3"></i>Crear nueva encuesta</button>
        <hr />
        <Modal show={showModal} className='black-overlay bdf-blur' size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header className={`${dark&&'bg-dark text-light'}`}>
            <Modal.Title id="contained-modal-title-vcenter">
              {showEditQuestionButton?`Editar pregunta`:`Agregar nueva pregunta`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={`${dark&&'bg-dark text-light'}`}>
            <div className="row row-cols-1 pb-3">
                <div className="col">
                    <label htmlFor="content" className="my-2">Escribe tu pregunta</label>
                    <input type="text" placeholder='Ej: ¿Que opinas sobre ...?' value={newQuestion.content} name='content' className={`form-control ${dark&&'question__text--dark'}`} onChange={(e)=>setNewQuestion({...newQuestion,content:e.target.value})}/>
                    <small className='text-muted'>Recuerda que la pregunta debe tener almenos 5 caracteres.</small>
                </div>
                <div className="col">
                    <label htmlFor="questionType" className="my-2">Elige el tipo de respuesta <abbr title="La forma en la que el usuario responderá la pregunta"><i className="fa fa-question-circle" aria-hidden="true"></i></abbr></label>
                    <select aria-label="Default select example" value={newQuestion.questionType} onChange={(e)=>setNewQuestion({...newQuestion,questionType:e.target.value})} name='questionType' className={`form-select ${dark&&'question__text--dark'}`}>
                        <option value="TEXT" className="py-3 fs-3">Escribir respuesta</option>
                        <option value="RADIO" className="py-3 fs-3">Elegir una opción</option>
                        <option value="CHECKBOX" className="py-3 fs-3">Elegir una o más opciones</option>
                    </select>
                </div>
                {showAnswerOptions&&(
                    <>
                    <div className="col">
                        <label htmlFor="option" className="my-2">Agregar Opciones</label>
                        <div className="input-group mb-3 d-none d-lg-flex">
                            <input type="text" className="form-control" name='option' onChange={(e)=>setOption(e.target.value)} onKeyDown={(e)=>addOption(e)} value={option} placeholder="Escribe aquí y presiona enter" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-warning" type="button" onClick={(e)=>addOption(e,true)} id="button-addon2">Agregar</button>
                        </div>
                        <div className="d-lg-none">
                            <input type="text" className="form-control" name='option' onChange={(e)=>setOption(e.target.value)} onKeyDown={(e)=>addOption(e)} value={option} placeholder="Escribe aquí y presiona enter" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-warning mt-2 w-100" type="button" onClick={(e)=>addOption(e,true)}>Agregar</button>
                        </div>
                        <small className='text-muted'>Recuerda que la pregunta debe tener almenos 2 opciones.</small>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center px-3 flex-wrap">
                        {newQuestion.options.map((option,index)=>(
                            <Chip label={option} className='m-2' color='warning' variant="outlined" key={'option-'+index} onClick={()=>deleteOption(index)} onDelete={()=>deleteOption(index)} />
                        ))}
                    </div>
                    </>
                )}
            </div>
          </Modal.Body>
          <Modal.Footer className={`${dark&&'bg-dark text-light'}`}>
            <button className="btn btn-danger rounded-1" onClick={resetNewQuestion}>Cancelar</button>
            {showEditQuestionButton?(
                <button className="btn btn-primary rounded-1" onClick={()=>editQuestion(questionIndex)}><i className="fa fa-pencil me-3"></i>Editar Pregunta</button>
            ):(
                <button className="btn btn-warning rounded-1" onClick={()=>addNewQuestion()}><i className="fa fa-plus me-3"></i>Añadir</button>
            )}
          </Modal.Footer>
        </Modal>
    </form>
  );
}

export default SurveyCreator