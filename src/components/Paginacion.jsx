import React from "react";

const Paginacion = ({total, pagina, setPagina}) => {
        const pagina = [];
        const resultado = Math.ceil(total/6);
        for (let i; i < resultado; i++ )
        pagina.push(index++);
    }
    const backPage=()=>{
        if (pagina>0 ) {
            setPagina(pagina-6)
            
        }
    };
    const nextPage=()=>{
        if (total - pagina >= 6 ) {
            setPagina(pagina + 6)
            
        }
    };
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">

          <li className="page-item">
            <a className="page-link" href="#"onClick={backPage} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
{paginas.map((item, index)=> (
    <li className="">
        

    </li> //terminar paginacion
))}



          <li className="page-item">
            <a className="page-link" href="#"onClick={nextPage} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );


export default Paginacion;
