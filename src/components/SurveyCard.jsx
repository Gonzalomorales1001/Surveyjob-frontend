import { useContext } from "react";
import { DarkModeContext } from "../App";
import { deleteSurvey } from "../helpers/SurveyAPI";
import Swal from "sweetalert2";
import { Button, Card, CardContent, CardHeader, CardActions } from "@mui/material";
import { capitalize } from "../App";

export default function SurveyCard({
  id,
  title,
  description,
  category,
  questions,
  answers,
  getSurveysByUserId
}) {

  const toggleSurveyStatus = async (id) => {
    Swal.fire({
      title: 'Eliminar encuesta',
      text: "¿Estás seguro que quieres eliminar esta encuesta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#666',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i> Eliminar encuesta',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await deleteSurvey(id);
        Swal.fire({
          icon: 'info',
          title: resp?.msg
        });
        getSurveysByUserId();
      }
    });
  }


  const shareSurvey = (id) => {
    const URL = `https://surveyjob.netlify.app/survey/${id}`
    if (navigator.share) {
      navigator.share({
        title: title,
        text: '¡Ayudame contestando mi encuesta de SurveyJob!',
        url: URL
      }).then().catch((e) => console.error(e))
    } else {
      navigator.clipboard.writeText(URL);
      Swal.fire({
        title: 'Link copiado al portapeles',
        icon: 'success'
      });
    }
  }
  const { dark } = useContext(DarkModeContext);
  return (
    <>
      <Card className={`my-2 card ${dark && 'card--dark'}`}>
        <CardHeader title={title} subheader={capitalize(category)} />
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardActions>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3">
              <div className="col">
                <Button className="rounded-3 w-100 my-2" color="error" variant="outlined" size="small" onClick={() => toggleSurveyStatus(id)}><i className="fa fa-trash-o me-2"></i>Eliminar encuesta</Button>
              </div>
              <div className="col">
                <Button className="rounded-3 w-100 my-2" color="warning" variant="contained" size="small" data-bs-toggle="modal" data-bs-target={`#modal-${id}`}>Ver respuestas</Button>
              </div>
              <div className="col">
                <Button className="rounded-3 w-100 my-2" variant="outlined" color="info" size="small" /*data-bs-toggle="modal" data-bs-target="#shareModal"*/ onClick={() => shareSurvey(id)}><i className="fa fa-clipboard me-2"></i>Copiar Link</Button>
              </div>
            </div>

          </div>
        </CardActions>
      </Card>
      <div
        className="modal fade"
        id={`modal-${id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className={`modal-dialog modal-dialog-scrollable`}>
          <div className={`modal-content modal-body ${dark && "bg-dark"}`}>
            {questions.map((e, index) => (
              <div key={e._id}>
                <h3>{e.content}</h3>
                <div>
                  {answers.map((a, i) => {
                    if (e._id == a.content[index].questionID) {
                      var respuesta = a.content[index].answer;
                      if (typeof respuesta == "object") {
                        var respActualizada = "";
                        if (respuesta.length == 1) {
                          return (
                            <p>
                              {i + 1}- {respuesta[0]}
                            </p>
                          );
                        }
                        respuesta.map((answer, indice) => {
                          if (indice == 0) {
                            return (respActualizada = answer);
                          }
                          if (indice + 1 == respuesta.length) {
                            respActualizada = `${respActualizada} y ${answer}`;
                          } else {
                            respActualizada = `${respActualizada}, ${answer}`;
                          }
                        });
                        return (
                          <p>
                            {i + 1}- {respActualizada}
                          </p>
                        );
                      }
                      return (
                        <p>
                          {i + 1}- {respuesta}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
            <button className="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </>
  );
}
