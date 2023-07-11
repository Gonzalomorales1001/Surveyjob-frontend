export default function SurveyCard ({id,title,category,questions,answers}) {

    return(
    <>
  <div className="card" style={{width:"33%",minWidth:"200px"}} >
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{category}</p>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modal-${id}`}>
     Launch static backdrop modal
    </button>
  </div>
  </div>
  <div class="modal fade" id={`modal-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">    
    <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content modal-body">
           {
            questions.map((e,index)=> 
            <div key={e._id}>
            <h3>{e.content}</h3>
            <div>
            {
              answers.map((a,i)=>{
                if (e._id==a.content[index].questionID) {
                  var respuesta=a.content[index].answer         
                  if (typeof respuesta == "object") {
                    var respActualizada= ""
                    if (respuesta.length==1) {
                      return <p>{i+1}- {respuesta[0]}</p>
                    }
                    respuesta.map((answer,indice)=>{
                      if (indice==0) {
                        return respActualizada=answer
                      }
                      if (indice+1==respuesta.length) {
                        respActualizada=`${respActualizada} y ${answer}`
                      } else{
                        respActualizada=`${respActualizada}, ${answer}`
                      }
                    })
                    return <p>{i+1}- {respActualizada}</p>
                  }
                  return <p>{i+1}- {respuesta}</p>
                }
              })
            }
            </div>
            </div>)
           }
        </div>
    </div>
  </div>
    </>
    )
}