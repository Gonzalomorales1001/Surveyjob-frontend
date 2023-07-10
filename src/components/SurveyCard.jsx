export default function SurveyCard ({id,title,category,questions,answers}) {

    return(
    <>
  <div className="card" style={{width:"18rem"}} >
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{category}</p>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
     Launch static backdrop modal
    </button>
  </div>
  </div>
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">    
    <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
           {
            questions.map((e)=> <h3 key={e._id}>{e.content}</h3>)
           }
        </div>
    </div>
  </div>
    </>
    )
}