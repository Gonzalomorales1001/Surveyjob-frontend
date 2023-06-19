import React, { useEffect, useState } from 'react';

const SurveysCreated = ({ userId, closeModal }) => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/surveys?userId=${userId}`);
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error('Error al obtener las encuestas:', error);
      }
    };

    fetchSurveys();
  }, [userId]);

  return (
    <div>
  <h2>Encuestas creadas por el usuario</h2>
  {surveys.length > 0 ? (
    surveys.map((survey) => (
      <div key={survey.id}>
        <h3>{survey.title}</h3>
        <p>{survey.description}</p>
      </div>
    ))
  ) : (
    <p>El usuario no ha creado ninguna encuesta.</p>
  )}
  <button onClick={closeModal}>Cerrar</button>
</div>
  );
};

export default SurveysCreated;
