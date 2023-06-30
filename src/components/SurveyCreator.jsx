import React, { useContext, useEffect, useState } from 'react'
import { DarkModeContext, UserContext } from '../App'
import { getCategories } from '../helpers/CategoryAPI';

const SurveyCreator = () => {
    const {dark}=useContext(DarkModeContext);
    const {userData} = useContext(UserContext);
    const [questions, setquestions] = useState([])
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(r=>{
            const activeCategories=[];
            r.Categories.forEach(category=>{
                if(category.status){
                    activeCategories.push(category.category)
                }
            })
            setCategories(activeCategories);
        }).catch(err=>{
            console.warn('Error al obtener las categorías');
            console.error(err)
        })
    }, [])
    
  return (
    <section className='container'>
        <div className="row row-cols-1 row-cols-md-2">
            <div className="col">
                <label htmlFor="title">Título de la encuesta</label>
                <input type="text" name='title' className={`form-control ${dark&&'question__text--dark'}`}/>
            </div>
            <div className="col">
                <label htmlFor="category">Selecciona una categoría</label>
                <select aria-label="Default select example" name='category' className={`form-select ${dark&&'question__text--dark'}`}>
                    {categories.map(category=>{
                        return (<option className='py-3'>{category}</option>)
                    })}
                </select>
            </div>
        </div>

    </section>
  )
}

export default SurveyCreator