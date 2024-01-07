import React from 'react';

function NumberedPagination({ comments, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(comments ? comments.count / 5 : 1);

  const handlePageClick = (page) => {
    setCurrentPage(page + 1);
  };

  return (
    <div className='flex w-full justify-center items-center'>
      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index}
          className={`cursor-pointer mx-1 text-center ${
            currentPage === index + 1 ? 'font-bold' : ''
          }`}
          onClick={() => handlePageClick(index)}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
}

export default NumberedPagination;
