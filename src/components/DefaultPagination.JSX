import React from "react";

const DefaultPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationGroup = () => {
    let startPage, endPage;
    if (totalPages <= 2) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 1 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    return [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);
  };

  return (
    <div className="flex space-x-2">
      {/* Previous Button */}
      <button
        aria-label="Previous Page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {getPaginationGroup().map((item) => (
        <button
          key={item}
          className={`px-3 py-1 rounded ${
            currentPage === item ? "bg-red-700 text-white" : "bg-green-500"
          } hover:bg-green-700 transition`}
          onClick={() => onPageChange(item)}
        >
          {item}
        </button>
      ))}

      {/* Ellipsis and Last Page Button */}
      {currentPage + 2 < totalPages && totalPages > 5 && (
        <>
          <button className="px-3 py-1 bg-gray-200 rounded" disabled>
            ...
          </button>
          <button
            className="px-3 py-1 bg-green-500 rounded hover:bg-green-700"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        aria-label="Next Page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default DefaultPagination;
