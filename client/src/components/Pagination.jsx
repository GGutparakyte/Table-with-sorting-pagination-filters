import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, goToNextPage, goToPreviousPage, }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={{display: 'flex', listStyle: 'none'}}>
      <button type="button" onClick={()=> goToPreviousPage() }>Prev</button>
        {pageNumbers.map((number) => (
          <li key={number} style={{marginRight: '5px'}}>
            <button type="button" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      <button type="button" onClick={()=> goToNextPage() }>Next</button>
      </ul>
    </nav>
  );
};

export default Pagination;
