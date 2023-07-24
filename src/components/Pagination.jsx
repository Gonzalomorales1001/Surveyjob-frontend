import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../App";

const Pagination = ({total,elementsPerPage,page,setPage}) => {
  const {dark} = useContext(DarkModeContext);
  const pages = [];

  const countPages = Math.ceil(total/elementsPerPage);

  for (let index = 0; index < countPages; index++) {
    pages.push(index + 1)
  }
  
  
  return (
    <nav aria-label="Pages">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page==1&&'disabled'}`}>
          <button disabled={page==1} className={`page-link ${dark&&'page-link--dark'}`} onClick={()=>setPage(page-1)}>&laquo;</button>
        </li>
          {pages.map((numberPage,index)=>{
            return <li className={`page-item ${page==numberPage&&'active'}`} key={'page-'+index+1}><button className={`page-link ${dark&&'page-link--dark'}`} onClick={()=>setPage(numberPage)}>{numberPage}</button></li>
            })
          }
        <li className={`page-item ${page==countPages&&'disabled'}`}>
          <button disabled={page==countPages} className={`page-link ${dark&&'page-link--dark'}`} onClick={()=>setPage(page+1)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
