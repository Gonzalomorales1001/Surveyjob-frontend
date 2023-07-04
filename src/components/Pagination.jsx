import React from "react";

const Pagination = (totalEncuestas, totalUsuarios) => {
  // const chunk = (array, size) => {
  //   const chunks = [];
  //   for (let i = 0; i < array.length; i += size) {
  //     chunks.push(array.slice(i, i + size));
  //   }
  //   return chunks;
  // };

  // const createItem = () => {
  //   const gameChunks = chunk(games, 5);

  //   return gameChunks.map((chunk, index) => (
  //     <Box key={index} display="flex" justifyContent='center' height='360px'>
  //       {chunk.map((game) => (
  //         <GameCard key={game.id} game={game}/>
  //       ))}
  //     </Box>
  //   ));
  // };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
