import React, { useState, useEffect } from 'react'
import { UserContext, DarkModeContext } from "../App";
import { useContext } from 'react';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { deleteCategory, getCategories, putCategory } from '../helpers/CategoryAPI';

const CategoryAdministrator = () => {
    const dark = useContext(DarkModeContext);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        const resp = await getCategories(0, 0);
        setCategories(resp.Categories);
    }

    const createCategory = async () => {

    }

    const editCategory = async (id) => {
        const { value: text } = await Swal.fire({
            title: 'Editar Categoría',
            input: 'text',
            inputAttributes: {
                'aria-label': 'Escribe aquí el nuevo nombre de la categoría',
                'required': true
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'El campo no puede estar vacío'
                }
            },
            confirmButtonText: 'Editar',
            confirmButtonColor: '#f0a500',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        });

        if (text) {
            const resp = await putCategory(id, text.toUpperCase());
            Swal.fire({
                icon: 'info',
                title: resp.msg
            });
            loadCategories();
        }
    }

    const removeCategory = async (id) => {
        Swal.fire({
            title: 'Eliminar Categoría',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#5c5c5c',
            confirmButtonText: '<i class="fa fa-trash-o"></i> Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await deleteCategory(id);
                Swal.fire({
                    title: resp.msg,
                    icon: 'question'
                }
                )
            }
        })
    }

    return (
        <>
            <h4 className="my-3">Todas las categorías</h4>
            <table className={`table ${dark && 'text-light'}`}>
                <thead>
                    <tr>
                        <th scope="col" className='d-none d-md-table-cell'>#</th>
                        <th scope="col">Categoría</th>
                        <th scope="col" className='d-none d-md-table-cell'>Creador</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((category, index) => (
                        <tr key={'category-' + index + 1}>
                            <th scope="row" className='d-none d-md-table-cell'>{index + 1}</th>
                            <td>{category.category}</td>
                            <td className='d-none d-md-table-cell'>{category?.user.username}</td>
                            <td><Button variant="outlined" color="warning" className='p-2' onClick={() => editCategory(category.catID)}><i className="fa fa-pencil"></i></Button></td>
                            <td><Button variant="contained" color="error" className='p-2' onClick={() => removeCategory(category.catID)}><i className="fa fa-trash-o"></i></Button></td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
            <div className="text-end">
                <button className="btn btn-warning rounded-3" onClick={createCategory}><i className="fa fa-plus me-2"></i>Nueva Categoría</button>
            </div>
        </>
    )
}

export default CategoryAdministrator