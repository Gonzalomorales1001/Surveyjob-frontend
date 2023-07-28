import { useContext } from "react";
import { DarkModeContext } from "../App";

export default function SurveyCard({
  id,
  title,
  category,
  questions,
  answers,
}) {
  const { dark } = useContext(DarkModeContext);
  return (
    <>
      <div className={`card ${dark && "card--dark"} my-5`}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{category}</p>
          <button
            type="button"
            className="btn btn-warning rounded-3"
            data-bs-toggle="modal"
            data-bs-target={`#modal-${id}`}
          >
            Ver Respuestas
          </button>
        </div>
      </div>
      <div
        class="modal fade"
        id={`modal-${id}`}
        tabindex="-1"
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
        <div
          className="modal fade"
          id={`modal-${id}`}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content modal-body">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
